using AutoMapper;
using BackendEvoltis.Dtos.Ai;
using BackendEvoltis.Dtos.ChatMessage;
using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendEvoltis.Endpoints
{
    public static class AiEndpoints
    {
        public static void MapAiEndpoints(this IEndpointRouteBuilder app)
        { 
            var aiGroup = app.MapGroup("ai");

            CrudEndpoints.MapRepositoryEndpoints<Ai>(aiGroup);

            aiGroup.MapPost("/", async ([FromBody] NewAi newAi, IMapper mapper, IRepository<Ai> aiRepository, CancellationToken cancellationToken) =>
            {
                var ai = mapper.Map<Ai>(newAi);

                var createdAi = mapper.Map<ShowChatMessage>(await aiRepository.AddAsync(ai, cancellationToken));
                return Results.Created($"/{createdAi.}", createdAi);
            });
        }
        }
}
