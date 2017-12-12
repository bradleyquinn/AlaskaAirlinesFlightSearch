import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlightSearchComponent } from './flightsearch.component';
import { FlightSearchRoutingModule } from './flightsearch-routing.module';
import { FlightSearchService } from './services/flightsearch.service';

@NgModule({
	imports: [
		CommonModule,
		FlightSearchRoutingModule,
		FormsModule
	],
	declarations: [
		FlightSearchComponent
	],
	providers: [
		FlightSearchService
	]
})

export class FlightSearchModule { }
