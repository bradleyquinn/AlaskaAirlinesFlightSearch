using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AlaskaAirlinesWebAPI.Controllers
{
	[Route("api/[controller]")]
	public class AirportsController : Controller
	{
		// GET: api/airports
		[HttpGet]
		[EnableCors("DataRetrieval")]
		public object Get()
		{
			string airportText = System.IO.File.ReadAllText(@"../AlaskaAirlinesWebAPI/Resources/airports.json");
			object airportObject = JsonConvert.DeserializeObject(airportText);

			return airportObject;
		}
	}
}
