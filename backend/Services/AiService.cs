using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BackendEvoltis.Entities;
using Microsoft.Extensions.Logging;

namespace BackendEvoltis.Services
{
    public interface IAiService
    {
        Task<bool> VerifyConnectionAsync(Ai ai);
        Task<string> SendPromptAsync(Ai ai, string prompt, int maxTokens = 100);
    }

    public class AiService : IAiService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<AiService> _logger;

        public AiService(IHttpClientFactory httpClientFactory, ILogger<AiService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        public async Task<bool> VerifyConnectionAsync(Ai ai)
        {
            try
            {
                // Send a simple test prompt to verify connection
                var response = await SendPromptAsync(ai, "Hello, this is a test message.", 10);
                return !string.IsNullOrEmpty(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying AI connection for AI with ID {AiId}", ai.Id);
                return false;
            }
        }

        public async Task<string> SendPromptAsync(Ai ai, string prompt, int maxTokens = 100)
        {
            if (ai == null)
                throw new ArgumentNullException(nameof(ai));

            if (string.IsNullOrEmpty(ai.Url) || string.IsNullOrEmpty(ai.Key) || string.IsNullOrEmpty(ai.Model))
                throw new ArgumentException("AI configuration is incomplete. URL, Key, and Model are required.");

            var client = _httpClientFactory.CreateClient();
            
            // Configure request headers
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", ai.Key);

            // Create request body
            var requestBody = new
            {
                model = ai.Model,
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = maxTokens
            };

            var jsonContent = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            try
            {
                // Send request to the AI provider
                var response = await client.PostAsync(ai.Url, content);
                
                // Ensure we got a success status code
                response.EnsureSuccessStatusCode();
                
                // Parse the response
                var responseBody = await response.Content.ReadAsStringAsync();
                var responseObject = JsonSerializer.Deserialize<JsonElement>(responseBody);
                
                // Extract the AI response text (this may need adjustment based on the specific AI provider's response format)
                if (responseObject.TryGetProperty("choices", out var choices) && 
                    choices.GetArrayLength() > 0 && 
                    choices[0].TryGetProperty("message", out var message) && 
                    message.TryGetProperty("content", out var content_text))
                {
                    return content_text.GetString();
                }
                
                _logger.LogWarning("Received unexpected response format from AI provider: {Response}", responseBody);
                return responseBody; // Return the raw response if we couldn't parse it
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP request error when communicating with AI provider: {Url}", ai.Url);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing AI request");
                throw;
            }
        }
    }
}