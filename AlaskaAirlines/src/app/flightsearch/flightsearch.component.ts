import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FlightSearchService } from './services/flightsearch.service';
import { Flight } from './models/flight';
import { Airport } from './models/airport';

@Component({
	selector: 'flightsearch-component',
	templateUrl: './flightsearch.component.html'
})

export class FlightSearchComponent implements OnInit {
	constructor(private flightSearch: FlightSearchService) { }

	currentAirports: Array<Airport> = new Array<Airport>();
	currentFlights: Array<Flight> = new Array<Flight>();

	airportSelectionFrom: any;
	airportSelectionTo: any;

	differentSelection: boolean = true;
	hideResultsDataTable: boolean = true;
	currentSearchSelection: any;

	ngOnInit() {
		// Initial data retrieval
		this.flightSearch.getFlights()
			.subscribe(flightResponse => {
				this.currentFlights = flightResponse;
			}, error => {
				console.log("Error getting flights: " + error);
			});

		this.flightSearch.getAirports()
			.subscribe(airportResponse => {
				this.currentAirports = airportResponse;
			}, error => {
				console.log("Error getting Airports: " + error);
			})

		// Default drop down selections
		this.airportSelectionFrom = "SEA";
		this.airportSelectionTo = "LAS";
	}

	chooseFlight() {
		if (this.airportSelectionFrom === this.airportSelectionTo) {
			this.differentSelection = false;
			this.hideResultsDataTable = true;
		} else {
			this.differentSelection = true;

			// Set current search criteria
			this.currentSearchSelection = this.currentFlights.filter(flights =>
				(flights.From === this.airportSelectionFrom && flights.To === this.airportSelectionTo));

			this.hideResultsDataTable = false;
		}
	}

	sortBy(type: string) {
		// Sort list ascending
		switch (type) {
			case "FlightNumber":
				this.currentSearchSelection = this.currentSearchSelection.sort((departsA, departsB) => {
					if (departsA.FlightNumber < departsB.FlightNumber) {
						return -1;
					} else if (departsA.FlightNumber > departsB.FlightNumber) {
						return 1;
					} else {
						return 0;
					}
				})
				break;
			case "Departs":
			default:
				this.currentSearchSelection = this.currentSearchSelection.sort((departsA, departsB) => {
					let departingA = new Date();
					let departingB = new Date();

					departingA.setHours(departsA.Departs.substr(0, 1), departsA.Departs.substr(2, 2));
					departingB.setHours(departsB.Departs.substr(0, 1), departsB.Departs.substr(2, 2));

					if (departingA < departingB) {
						return -1;
					} else if (departingA > departingB) {
						return 1;
					} else {
						return 0;
					}
				})
				break;
			case "Arrives":
				this.currentSearchSelection = this.currentSearchSelection.sort((departsA, departsB) => {
					let arrivingA = new Date();
					let arrivingB = new Date();

					arrivingA.setHours(departsA.Arrives.substr(0, 1), departsA.Arrives.substr(2, 2));
					arrivingB.setHours(departsB.Arrives.substr(0, 1), departsB.Arrives.substr(2, 2));

					if (arrivingA < arrivingB) {
						return -1;
					} else if (arrivingA > arrivingB) {
						return 1;
					} else {
						return 0;
					}
				})
				break;
			case "MainCabinPrice":
				this.currentSearchSelection = this.currentSearchSelection.sort((departsA, departsB) => {
					if (departsA.MainCabinPrice < departsB.MainCabinPrice) {
						return -1;
					} else if (departsA.MainCabinPrice > departsB.MainCabinPrice) {
						return 1;
					} else {
						return 0;
					}
				})
				break;
			case "FirstClassPrice":
				this.currentSearchSelection = this.currentSearchSelection.sort((departsA, departsB) => {
					if (departsA.FirstClassPrice < departsB.FirstClassPrice) {
						return -1;
					} else if (departsA.FirstClassPrice > departsB.FirstClassPrice) {
						return 1;
					} else {
						return 0;
					}
				})
				break;
		}
	}
}
