using Microsoft.AspNetCore.Mvc;

namespace weatherApi.Controllers;

[ApiController]
[Route("[controller]")]

public class WeatherConditionController : ControllerBase
{
    // TodayForecast tdyForecast = new TodayForecast(DateTime.Now.AddHours(1), "Aa", 12);

    private static readonly string[] Summaries = new[]
    {
        "Cerah", "Mendung", "Hujan"
    };

    private readonly ILogger<WeatherConditionController> _logger;

    public WeatherConditionController(ILogger<WeatherConditionController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherCondition")]
    public IEnumerable<WeatherCondition> Get()
    {
        return Enumerable.Range(1, 1).Select(index => new WeatherCondition
        {
            City = "Yogyakarta",
            Date = DateTime.Now.ToString("dddd, dd MMMM yyyy"),
            Time = DateTime.Now.ToString("HH:mm"),
            Temprature = Random.Shared.Next(20, 38),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)],
            TodayForecast = Enumerable.Range(0, 24).Select(value => new TodayForecast(value, Summaries[Random.Shared.Next(Summaries.Length)], Random.Shared.Next(20, 50))).ToArray(),
        }).ToArray();

    }



}