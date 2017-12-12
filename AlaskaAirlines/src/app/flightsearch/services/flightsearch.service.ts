import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
import { environment } from '../../../environments/environment';

@Injectable()
export class FlightSearchService {
	constructor(private http: Http) { }

	getAirports(): Observable<Airport[]> {
		return this.http.get(environment.apiDomain + '/api/airports')
			.map(data => this.extractAirportData(data))
			.catch(err => this.handleError(err));
	}

	getFlights(): Observable<Flight[]> {
		return this.http.get(environment.apiDomain + '/api/flights')
			.map(data => this.extractFlightData(data))
			.catch(err => this.handleError(err));
	}

	private extractAirportData(res: Response) {
		let body = res.json();
		let airports: Airport[] = new Array<Airport>();

		if (body) {
			airports = body.map((y: any) => {
				let airport: Airport = new Airport;

				airport.Code = y.Code;
				airport.Name = y.Name;

				return airport;
			});
		}

		return airports;
	}

	private extractFlightData(res: Response) {
		let body = res.json();
		let flights: Flight[] = new Array<Flight>();

		if (body) {
			flights = body.map((x: any) => {
				let flight: Flight = new Flight;

				flight.To = x.To;
				flight.From = x.From;
				flight.FlightNumber = x.FlightNumber;
				flight.Departs = x.Departs;
				flight.Arrives = x.Arrives;
				flight.MainCabinPrice = x.MainCabinPrice;
				flight.FirstClassPrice = x.FirstClassPrice;

				return flight;
			});
		}

		return flights;
	}

	private handleError(error: Response | any) {
		let errMsg: string;

		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		console.log('Data retrieval has failed: ' + error + errMsg);

		return Observable.throw(errMsg);
	}
}
