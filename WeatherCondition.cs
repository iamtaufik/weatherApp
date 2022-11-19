namespace weatherApi;

public class WeatherCondition
{
    public string? Date { get; set; }
    public string? Time { get; set; }
    public string? City { get; set; }
    public int Temprature { get; set; }
    public string? Summary { get; set; }

    public TodayForecast[]? TodayForecast { get; set; }
    // private TodayForecast[]? _todayForecast;
    // public void TodayForecast(TodayForecast[] tArray)
    // {
    //     _todayForecast = new TodayForecast[tArray.Length];

    //     for (int i = 0; i < tArray.Length; i++)
    //     {
    //         _todayForecast[i] = tArray[i];
    //     }
    // }

}

public class TodayForecast
{
    public TodayForecast(int time, string smmry, int tempr)
    {
        this.Time = time >= 10 ? time + ":00" : "0" + time + ":00";
        this.Summary = smmry;
        this.Temprature = tempr;
    }
    public string Time { get; set; }
    public string? Summary { get; set; }
    public int? Temprature { get; set; }

}