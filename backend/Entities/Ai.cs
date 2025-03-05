﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BackendEvoltis.Dtos;

namespace BackendEvoltis.Entities
{
    public class Ai : Entity
    {
        public HashedString Key { get; set; }
        public string Url { get; set; }
        public string Model { get; set; }
        public int OwnerId { get; set; } // Navigation property

        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; }
    }
}
