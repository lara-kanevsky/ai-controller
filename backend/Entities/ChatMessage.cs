using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class ChatMessage : Entity
    {
        public int ChatId { get; set; } // Navigation property

        [ForeignKey("ChatId")]
        public virtual Chat Chat { get; set; }
        public int OwnerId { get; set; }

        public string Content { get; set; }

        public DateTime SentAt { get; set; } = DateTime.MinValue;

        public SenderType SenderType { get; set; }

        [ForeignKey("SenderId")]
        public virtual User Sender { get; set; }
        public int SenderId { get; set; }

        public int AIId { get; set; }

    }
}
