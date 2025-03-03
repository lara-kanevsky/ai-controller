using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class ChatMessage : Entity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public virtual Chat Chat { get; set; } // Navigation property

        public User Owner { get; set; }

        public string Content { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public SenderType Sender { get; set; }

        public User User { get; set; }

        public Ai AI { get; set; }
    }
}
