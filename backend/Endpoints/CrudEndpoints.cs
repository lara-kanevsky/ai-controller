using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;

namespace BackendEvoltis.Endpoints
{
    public static class CrudEndpoints
    {
        public static void MapRepositoryEndpoints<TEntity>(this IEndpointRouteBuilder app, string baseRoute) where TEntity : Entity
        {
            var repositoryGroup = app.MapGroup(baseRoute);

            MapRepositoryEndpoints<TEntity>(repositoryGroup);
        }

        public static void MapRepositoryEndpoints<TEntity>(RouteGroupBuilder repositoryGroup) where TEntity : Entity
        {
            repositoryGroup.MapGet("/", async (IRepository<TEntity> repository, CancellationToken cancellationToken) =>
            {
                var entities = await repository.GetAllAsync(cancellationToken);
                return Results.Ok(entities);
            });

            repositoryGroup.MapGet("/{id}", async (IRepository<TEntity> repository, int id, CancellationToken cancellationToken) =>
            {
                var entity = await repository.GetByIdAsync(id, cancellationToken);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });

            repositoryGroup.MapPost("/", async (IRepository<TEntity> repository, TEntity entity, CancellationToken cancellationToken) =>
            {
                await repository.AddAsync(entity, cancellationToken);
                return Results.Created($"/{entity.Id}", entity);
            });

            repositoryGroup.MapPut("/{id}", async (IRepository<TEntity> repository, int id, TEntity updatedEntity, CancellationToken cancellationToken) =>
            {
                var entity = await repository.GetByIdAsync(id, cancellationToken);
                if (entity is null)
                    return Results.NotFound();

                await repository.UpdateAsync(updatedEntity, cancellationToken);
                return Results.NoContent();
            });

            repositoryGroup.MapDelete("/{id}", async (IRepository<TEntity> repository, int id, CancellationToken cancellationToken) =>
            {
                var entity = await repository.GetByIdAsync(id, cancellationToken);
                if (entity is null)
                    return Results.NotFound();

                await repository.RemoveAsync(id, cancellationToken);
                return Results.NoContent();
            });
        }
    }
}
