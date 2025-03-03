using BackendEvoltis.Entities;
using EvoltisBackend.Data;
using EvoltisBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackendEvoltis.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        public readonly ProductDbContext DbContext;

        public Repository(ProductDbContext dbContext)
        {
            DbContext=dbContext;
        }

        public async Task AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            await DbContext.Set<TEntity>().AddAsync(entity);
        }

        public async Task UpdateAsync(TEntity entity, CancellationToken cancellationToken)
        {
            DbContext.Set<TEntity>().Update(entity);
            await DbContext.SaveChangesAsync(cancellationToken);
        }
        public async Task RemoveAsync(int id, CancellationToken cancellationToken)
        {
            var entity = await DbContext.Set<TEntity>().FirstOrDefaultAsync(x => x.Id ==id, cancellationToken);
            DbContext.Set<TEntity>().Remove(entity);
            await DbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<TEntity?> GetByIdAsync(int id, CancellationToken cancellationToken)
         =>
            await DbContext.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(x => x.Id ==id, cancellationToken);

        public async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken)
        => await DbContext.Set<TEntity>().AsNoTracking().ToListAsync(cancellationToken);
    }
}
