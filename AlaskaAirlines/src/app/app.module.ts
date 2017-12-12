import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header.component';
import { FooterComponent } from './shared/components/footer.component';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		FormsModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
