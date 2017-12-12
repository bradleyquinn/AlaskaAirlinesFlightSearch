import { Component } from '@angular/core';

@Component({
	selector: 'alaska-airlines-footer',
	templateUrl: './footer.component.html',
})

export class FooterComponent {
	authorInformation = {
		name: "Brad Quinn",
		company: "iTrellis",
		copyright: new Date(Date.now()).toLocaleDateString()
	}
}
