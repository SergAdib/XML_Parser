using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddXmlSerializerFormatters()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Formatting = Formatting.Indented;
    });
    
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var MyAllowLocalhost = "MyAllowLocalhost";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowLocalhost,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:8080",
                                              "https://localhost:8080")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(MyAllowLocalhost);

app.UseAuthorization();

app.MapControllers();

app.Run();
