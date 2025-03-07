using BackendEvoltis.Entities;

namespace BackendEvoltis.Dtos.ChatMessage
{
    public sealed record NewChatMessage(

    int ChatId,

     int OwnerId,

     string Content,

     DateTime Timestamp,

     SenderType SenderType,

     int SenderId,

     int AIId
        );
}
