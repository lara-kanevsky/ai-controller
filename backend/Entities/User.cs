using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendEvoltis.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }

        public virtual ICollection<Ai> Ais { get; set; } = new List<Ai>();
    }
}
