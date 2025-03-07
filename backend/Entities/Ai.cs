using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class Ai : Entity
    {
        //For prod: hash the key witht the password
        //public string HashedKey { get; set; }
        public string Key { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
        public int OwnerId { get; set; } // Navigation property

        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; }
    }
}
