using AutoMapper;
using BackendEvoltis.Entities;
using BackendEvoltis.Dtos;

using BackendEvoltis.Repositories;
using BackendEvoltis.Services;

namespace BackendEvoltis.Endpoints
{
    public static class AiEndpoints
    {
        public static void MapAiEndpoints(this IEndpointRouteBuilder app)
        {
            var chatGroup = app.MapGroup("ai");

            chatGroup.MapPost("/verify-ai", async (IMapper mapper,
                                                  IAiService aiService,
                                                  IRepository<Ai> aiRepository,
                                                  int aiId,
                                                  CancellationToken cancellationToken) =>
            {
                var ai = await aiRepository.GetByIdAsync(aiId, cancellationToken);

                if (ai == null)
                    return Results.NotFound($"AI with ID {aiId} not found.");

                var isConnected = await aiService.VerifyConnectionAsync(ai);

                return Results.Ok(new { aiId = ai.Id, isConnected });
            });

            // For sending a prompt to an AI
            chatGroup.MapPost("/send-prompt", async (IMapper mapper,
                                                    IAiService aiService,
                                                    IRepository<Ai> aiRepository,
                                                    PromptRequest request,
                                                    CancellationToken cancellationToken) =>
            {
                var ai = await aiRepository.GetByIdAsync(request.AiId, cancellationToken);

                if (ai == null)
                    return Results.NotFound($"AI with ID {request.AiId} not found.");

                try
                {
                    var response = await aiService.SendPromptAsync(ai, request.Prompt, request.MaxTokens ?? 100);
                    return Results.Ok(new { response });
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(new { error = ex.Message });
                }
            });
        }
    }
}
