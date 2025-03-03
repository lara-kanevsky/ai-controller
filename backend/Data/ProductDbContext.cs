using BackendEvoltis.Entities;
using EvoltisBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace EvoltisBackend.Data
{
    public class ProductDbContext(DbContextOptions<ProductDbContext> options) : DbContext (options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Chat> Chats { get; set; }

        public DbSet<ChatMessage> ChatMessages { get; set; }

        public DbSet<Ai> Ais { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatMessage>()
                .HasOne(cm => cm.Chat)
                .WithMany(c => c.ChatMessages)
                .HasForeignKey(cm => cm.ChatId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
