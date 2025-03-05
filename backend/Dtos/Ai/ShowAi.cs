using BackendEvoltis.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendEvoltis.Dtos.Ai
{
    public class ShowAi
    {
        public int Id { get; set; }
        public string UnhashedKey { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
        public int OwnerId { get; set; } // Navigation property

        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; }
    }
}
