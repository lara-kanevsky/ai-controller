using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;

namespace BackendEvoltis.Endpoints
{
    public static class ChatEndpoints
    {
        public static void MapChatEndpoints(this IEndpointRouteBuilder app)
        {
            var chatGroup = app.MapGroup("chat");

            chatGroup.MapGet("/", async (IRepository<Chat> chatRepository, CancellationToken cancellationToken) =>
            {
                var chats = await chatRepository.GetAllAsync(cancellationToken);
                return Results.Ok(chats);
            });
        }
    }
}
