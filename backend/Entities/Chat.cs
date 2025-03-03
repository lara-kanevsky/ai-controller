using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class Chat : Entity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public Ai AI { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for messages
        public virtual ICollection<ChatMessage> ChatMessage { get; set; } = new List<ChatMessage>();

    }
}
