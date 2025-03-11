using System.ComponentModel.DataAnnotations.Schema;

namespace BackendEvoltis.Entities
{
    public class ShowAi
    {
        public string Key { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
        public int OwnerId { get; set; }
        public bool IsActive { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
