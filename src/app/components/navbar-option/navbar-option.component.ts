import { Component, Input } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { IconsComponent } from "@components/icons/icons.component";

@Component({
	selector: "app-navbar-option",
	standalone: true,
	imports: [RouterLinkWithHref, IconsComponent],
	templateUrl: "./navbar-option.component.html",
})
export class NavbarOptionComponent {
	@Input({ required: true }) link = "";
	@Input({ required: true }) title = "";
	@Input({ required: true }) img!: ValidIcons;
}
