using BackendEvoltis.Endpoints;
using BackendEvoltis.Entities;
using BackendEvoltis.Repositories;
using EvoltisBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy
            .WithOrigins("http://localhost:4200")  // Your Angular frontend URL
            .AllowAnyMethod()  // Allow any HTTP method (GET, POST, etc.)
            .AllowAnyHeader());  // Allow any headers
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ProductDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddScoped<ChatMessageRepository>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));


builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);

var app = builder.Build();
app.UseCors("AllowAngularApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.MapProductEndpoints();
app.MapRepositoryEndpoints<Chat>("chat");
app.MapRepositoryEndpoints<User>("user");


app.MapChatMessageEndpoints();
app.MapAiEndpoints();



app.Run();
