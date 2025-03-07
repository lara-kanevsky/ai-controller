//using BackendEvoltis.Dtos;
//using BackendEvoltis.Repositories;
//using EvoltisBackend.Entities;

//namespace BackendEvoltis.Endpoints
//{
//    public static class ProductEndpoints
//    {
//        public static void MapProductEndpoints(this IEndpointRouteBuilder app)
//        {
//            var productGroup = app.MapGroup("products");

//            productGroup.MapGet("/",async (IProductRepository IProductRepository,CancellationToken cancellationToken) =>
//            {
//                var products = await IProductRepository.GetAllAsync(cancellationToken);

//                return Results.Ok(products);
//            });

//            productGroup.MapGet("/{id:guid}", async (Guid id,IProductRepository IProductRepository, CancellationToken cancellationToken) =>
//            {
//                var product = await IProductRepository.GetProductByIdAsync(id,cancellationToken);

//                if(product is null)
//                {
//                    return Results.NotFound();
//                }

//                return Results.Ok(product);
//            }).WithName("GetProductById");

//            productGroup.MapPost("/", async (CreateProductRequest request, IProductRepository IProductRepository, CancellationToken cancellationToken) =>
//            {
//                Product product = new()
//                {
//                    Id = Guid.NewGuid(),
//                    Name = request.Name,
//                    Description = request.Description,
//                    Quantity = request.Quantity,
//                    Price = request.Price
//                };

//                await IProductRepository.AddAsync(product,cancellationToken);

//                return Results.Created("GetProductById",product);
//            });
//            productGroup.MapPut("/{id:guid}", async (Guid id, CreateProductRequest request, IProductRepository IProductRepository, CancellationToken cancellationToken) =>
//            {
//                Product? product =await  IProductRepository.GetProductByIdAsync(id,cancellationToken);

//                if (product is null)
//                {
//                    return Results.NotFound();
//                }


//                product.Name = request.Name;
//                product.Description = request.Description;
//                product.Quantity = request.Quantity;
//                product.Price = request.Price;

//                await IProductRepository.UpdateAsync(product,cancellationToken);

//                return Results.NoContent();
//            });

//            productGroup.MapDelete("/{id:guid}", async (Guid id, IProductRepository IProductRepository, CancellationToken cancellationToken) =>
//            {
//                Product? product = await IProductRepository.GetProductByIdAsync(id, cancellationToken);

//                if (product is null)
//                {
//                    return Results.NotFound();
//                }


//                await IProductRepository.DeleteAsync(product,cancellationToken);

//                return Results.NoContent();
//            });
//        }
//    }
//    }

