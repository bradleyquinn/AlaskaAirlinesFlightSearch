﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace AlaskaAirlinesWebAPI.Controllers
{
	[Route("api/[controller]")]
	public class FlightsController : Controller
	{
		// GET: api/flights
		[HttpGet]
		[EnableCors("DataRetrieval")]
		public object Get()
		{
			string flightText = System.IO.File.ReadAllText(@"../AlaskaAirlinesWebAPI/Resources/flights.json");
			object flightObject = JsonConvert.DeserializeObject(flightText);

			return flightObject;
		}
	}
}
