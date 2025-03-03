//using EvoltisBackend.Data;
//using EvoltisBackend.Entities;
//using Microsoft.EntityFrameworkCore;

//namespace BackendEvoltis.Repositories
//{
//    public sealed class ProductRepository(ProductDbContext dbContext) : IProductRepository
//    {
//        public async Task AddAsync(Product product, CancellationToken cancellationToken)
//        {
//            dbContext.Products.Add(product);
//            await dbContext.SaveChangesAsync(cancellationToken);

//        }

//        public async Task DeleteAsync(Product product, CancellationToken cancellationToken)
//        {
//            dbContext.Products.Remove(product);
//            await dbContext.SaveChangesAsync(cancellationToken);
//        }

//        public async Task<IEnumerable<Product>> GetAllAsync( CancellationToken cancellationToken)
//        =>await dbContext.Products.AsNoTracking().ToListAsync(cancellationToken);
//        public async Task<Product?> GetProductByIdAsync(Guid id, CancellationToken cancellationToken)
//        =>
//            await dbContext.Products.AsNoTracking().FirstOrDefaultAsync(x=>x.Id ==id,cancellationToken);
        

//        public async Task UpdateAsync(Product product, CancellationToken cancellationToken)
//        {
//            dbContext.Products.Update(product);
//            await dbContext.SaveChangesAsync(cancellationToken);
//        }
//    }
//}
