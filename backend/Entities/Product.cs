﻿namespace EvoltisBackend.Entities
{
    public sealed class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public Decimal Price { get; set; }

    }
}
