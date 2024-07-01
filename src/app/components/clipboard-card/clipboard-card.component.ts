import { Component, Input } from "@angular/core";

@Component({
	selector: "app-clipboard-card",
	standalone: true,
	imports: [],
	templateUrl: "./clipboard-card.component.html",
})
export class ClipboardCardComponent {
	@Input({ required: true }) id = "";
	@Input({ required: true }) time = "";
	@Input({ required: true }) data = "";
}
