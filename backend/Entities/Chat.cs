using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class Chat : Entity
    {
        
        public int UserId { get; set; }

        public int AIId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.MinValue;

        public virtual ICollection<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();

    }
}
