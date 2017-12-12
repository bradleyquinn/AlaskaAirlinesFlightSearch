import { async, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FlightSearchService } from './flightsearch.service';

describe('Flight Search Service', function () {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			providers: [
				FlightSearchService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		})
	}))


	it('Should validate flight data retrieval functionality', async(
		inject([FlightSearchService, XHRBackend], (flightSearchService, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(flightResponseMock())
				})))
			});

			flightSearchService.getFlights().subscribe((flight) => {
				expect(flight[0].From).toBe("SEA");
				expect(flight[0].To).toBe("LAS");
				expect(flight[0].FlightNumber).toBe(1000);
				expect(flight[0].Departs).toBe("6:00 PM");
				expect(flight[0].Arrives).toBe("8:00 PM");
				expect(flight[0].MainCabinPrice).toBe(100);
				expect(flight[0].FirstClassPrice).toBe(200);
			})
		})
	))

	it('Should validate airport data retrieval functionality', async(
		inject([FlightSearchService, XHRBackend], (flightSearchService, mockBackend) => {
			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(airportResponseMock())
				})))
			});

			flightSearchService.getAirports().subscribe((airport) => {
				expect(airport[0].Code).toBe("SEA");
				expect(airport[0].Name).toBe("Seattle WA (SEA-Seattle/Tacoma Intl.)");
			})
		})
	))

	function flightResponseMock(): object {
		return [{
			From: "SEA",
			To: "LAS",
			FlightNumber: 1000,
			Departs: "6:00 PM",
			Arrives: "8:00 PM",
			MainCabinPrice: 100,
			FirstClassPrice: 200
		}]
	}

	function airportResponseMock(): object {
		return [{
			Code: "SEA",
			Name: "Seattle WA (SEA-Seattle/Tacoma Intl.)"
		}]
	}
})
