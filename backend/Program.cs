using BackendEvoltis.Endpoints;
using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;
using EvoltisBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ProductDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("Database")));

//builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));


builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.MapProductEndpoints();
app.MapRepositoryEndpoints<Chat>("chat");
app.MapRepositoryEndpoints<ChatMessage>("chatmessage");



app.Run();
