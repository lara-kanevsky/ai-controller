using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class Ai
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string HashedKey { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
    }
}
