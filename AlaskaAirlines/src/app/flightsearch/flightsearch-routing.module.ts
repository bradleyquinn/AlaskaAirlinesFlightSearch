import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlightSearchComponent } from './flightsearch.component';

const routes: Routes = [
	{ path: '', component: FlightSearchComponent }
]

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})

export class FlightSearchRoutingModule { }
