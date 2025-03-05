using BackendEvoltis.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendEvoltis.Dtos.Ai
{
    public class NewAi
    {
        public string Key { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
        public int OwnerId { get; set; }
    }
}
