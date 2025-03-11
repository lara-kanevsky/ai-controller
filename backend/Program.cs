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

builder.WebHost.ConfigureKestrel(options =>
{
    // Example: Configure Kestrel to listen on HTTP and HTTPS ports
    options.ListenAnyIP(5186);  // HTTP on port 5186
    options.ListenAnyIP(7214, listenOptions =>
    {
        listenOptions.UseHttps();  // HTTPS on port 7214
    });

    // Optional: Configure additional Kestrel settings here, like timeouts, limits, etc.
    // options.Limits.MaxRequestBodySize = 10 * 1024; // Example for limiting request body size (in bytes)
});


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
app.MapRepositoryEndpoints<Ai>("ai");


app.MapChatMessageEndpoints();



app.Run();
