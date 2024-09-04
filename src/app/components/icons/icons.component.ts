import { Component, Input } from "@angular/core";

@Component({
	selector: "app-icons",
	standalone: true,
	templateUrl: "./icons.component.html",
})
export class IconsComponent {
	@Input({ required: true }) name!: ValidIcons;
	@Input() color = "#fff";
}
