using BackendEvoltis.Entities;
using EvoltisBackend.Data;
using EvoltisBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackendEvoltis.Repositories
{
    internal sealed class ChatMessageRepository : Repository<ChatMessage>, IRepository<ChatMessage>
    {
        public ChatMessageRepository(ProductDbContext context) : base(context)
        { }

        public new async Task<IEnumerable<ChatMessage>> GetAllAsync(CancellationToken cancellationToken)
    => await DbContext.ChatMessages
        .AsNoTracking()
        .Include(cm => cm.Sender) // Include the User (Sender)
        .ToListAsync(cancellationToken);

    }

}

