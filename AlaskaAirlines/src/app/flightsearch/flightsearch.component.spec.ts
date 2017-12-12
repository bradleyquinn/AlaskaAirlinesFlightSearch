import { FlightSearchComponent } from './flightsearch.component';
import { Flight } from './models/flight';
import { Airport } from './models/airport';
import { FlightSearchService } from './services/flightsearch.service';

import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Flight Search Component', function () {
	let comp: FlightSearchComponent;
	let fixture: ComponentFixture<FlightSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [
				FlightSearchComponent
			],
			providers: [
				{ provide: FlightSearchService, useClass: FlightSearchServiceMock }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FlightSearchComponent);
		comp = fixture.componentInstance;
		fixture.detectChanges();
	})

	it('Should create component', () => expect(comp).toBeDefined());

	it('Should validate default drop down values', () => {
		expect(comp.airportSelectionFrom).toBe("SEA");
		expect(comp.airportSelectionTo).toBe("LAS");
	})

	it('Should validate data retrieval', () => {
		expect(comp.currentAirports[0].Code).toBe("SEA");
		expect(comp.currentAirports[0].Name).toBe("Seattle WA (SEA-Seattle/Tacoma Intl.)");
		expect(comp.currentFlights[0].To).toBe("LAS");
		expect(comp.currentFlights[0].From).toBe("SEA");
		expect(comp.currentFlights[0].FlightNumber).toBe(1000);
		expect(comp.currentFlights[0].Departs).toBe("6:00 PM");
		expect(comp.currentFlights[0].Arrives).toBe("8:00 PM");
		expect(comp.currentFlights[0].MainCabinPrice).toBe(100);
		expect(comp.currentFlights[0].FirstClassPrice).toBe(200);
	})

	it('Should validate choosing a flight', () => {
		comp.chooseFlight();
		expect(comp.currentSearchSelection).toEqual([
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 },
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 }
		]);
	})

	it('Should validate the sorting functionality', () => {
		comp.chooseFlight();

		comp.sortBy("Departs");
		expect(comp.currentSearchSelection).toEqual([
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 },
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 }
		]);

		comp.sortBy("FlightNumber");
		expect(comp.currentSearchSelection).toEqual([
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 },
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 }
		]);

		comp.sortBy("Arrives");
		expect(comp.currentSearchSelection).toEqual([
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 },
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 }
		]);

		comp.sortBy("MainCabinPrice");
		expect(comp.currentSearchSelection).toEqual([
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 },
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 }
		]);

		comp.sortBy("FirstClassPrice");
		expect(comp.currentSearchSelection).toEqual([
			{ From: "SEA", To: "LAS", FlightNumber: 1001, Departs: "7:00 PM", Arrives: "9:00 PM", MainCabinPrice: 110, FirstClassPrice: 190 },
			{ From: 'SEA', To: 'LAS', FlightNumber: 1000, Departs: '6:00 PM', Arrives: '8:00 PM', MainCabinPrice: 100, FirstClassPrice: 200 }
		]);
	})
});


export class FlightSearchServiceMock {
	getFlights(): Observable<Flight[]> {
		return Observable.of([{
			From: "SEA",
			To: "LAS",
			FlightNumber: 1000,
			Departs: "6:00 PM",
			Arrives: "8:00 PM",
			MainCabinPrice: 100,
			FirstClassPrice: 200
		},
		{
			From: "SEA",
			To: "LAS",
			FlightNumber: 1001,
			Departs: "7:00 PM",
			Arrives: "9:00 PM",
			MainCabinPrice: 110,
			FirstClassPrice: 190
		}])
	}

	getAirports(): Observable<Airport[]> {
		return Observable.of([{
			Code: "SEA",
			Name: "Seattle WA (SEA-Seattle/Tacoma Intl.)"
		},
		{
			Code: "LAS",
			Name: "Las Vegas NV (LAS-McCarran Intl.)"
		}])
	}
}
