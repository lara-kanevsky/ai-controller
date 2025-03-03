using AutoMapper;
using BackendEvoltis.Dtos.ChatMessage;
using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;
using EvoltisBackend.Entities;

namespace BackendEvoltis.Endpoints
{
    public static class ChatMessageEndpoints
    {
        public static void MapChatMessageEndpoints(this IEndpointRouteBuilder app)
        {
            var chatGroup = app.MapGroup("chatmessage");

            chatGroup.MapPost("/", async (IMapper mapper, ChatMessageRepository chatRepository, NewChatMessage newChatMessage, CancellationToken cancellationToken) =>
            {
                var chatMessage = mapper.Map<ChatMessage>(newChatMessage);
                chatMessage.OwnerId = chatMessage.SenderId;
                chatMessage.AIId = 1;

                var createdChatMessage =mapper.Map<ShowChatMessage>( await chatRepository.AddAsync(chatMessage,cancellationToken));
                return Results.Created("",createdChatMessage);
            });

            chatGroup.MapGet("/", async (IMapper mapper, ChatMessageRepository chatRepository, CancellationToken cancellationToken) =>
            {
                var showChatMessages = mapper.Map<List<ShowChatMessage>>(await chatRepository.GetAllAsync( cancellationToken));
                return Results.Ok(showChatMessages);
            });

            chatGroup.MapGet("/{id}", async (IMapper mapper, ChatMessageRepository chatRepository, int id, CancellationToken cancellationToken) =>
            {
                var entity = mapper.Map<ShowChatMessage>(await chatRepository.GetByIdAsync(id, cancellationToken));
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });
        }
    }
}
