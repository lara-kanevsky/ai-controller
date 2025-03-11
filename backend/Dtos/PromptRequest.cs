public class PromptRequest
{
    public int AiId { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public int? MaxTokens { get; set; }
}