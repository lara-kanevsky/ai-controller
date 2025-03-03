using BackendEvoltis.Entities;
using EvoltisBackend.Entities;

namespace BackendEvoltis.Repositories
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        Task AddAsync(TEntity product, CancellationToken cancellationToken);
        Task UpdateAsync(TEntity product, CancellationToken cancellationToken);
        Task RemoveAsync(int id, CancellationToken cancellationToken);
        Task<TEntity?> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken);
    }
}
