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
            var aiGroup = app.MapGroup("ai");

            CrudEndpoints.MapRepositoryEndpoints<Ai>(aiGroup);

            aiGroup.MapGet("/checked", async (IMapper mapper, IAiService aiService,CancellationToken cancellationToken) =>
            {
                var ais = await aiService.GetAllAisAsync(cancellationToken);

                return Results.Ok(ais);
            });

            aiGroup.MapPost("/checked", async (IMapper mapper, IAiService aiService, Ai newAi,IRepository<Ai> aiRepository, CancellationToken cancellationToken) =>
            {
                var createdAi = await aiRepository.AddAsync(newAi,cancellationToken);
                var showAi = await aiService.GetAiAsync(createdAi.Id,cancellationToken);
                return Results.Created("",showAi);
            });

            aiGroup.MapPost("/verify-ai", async (IMapper mapper,
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
            aiGroup.MapPost("/send-prompt", async (IMapper mapper,
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
