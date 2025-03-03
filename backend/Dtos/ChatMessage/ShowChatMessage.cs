using BackendEvoltis.Entities;

namespace BackendEvoltis.Dtos.ChatMessage
{
    public class ShowChatMessage
    {
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }

        public SenderType SenderType { get; set; }

        public string SenderName { get; set; }
    };
}
