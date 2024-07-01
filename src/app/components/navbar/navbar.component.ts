import { Component } from "@angular/core";
import { RouterLinkWithHref, RouterModule } from "@angular/router";
import { datagram } from "./navbar.data";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [RouterLinkWithHref, RouterModule],
	templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
	MENU_OPTIONS = datagram;
}
