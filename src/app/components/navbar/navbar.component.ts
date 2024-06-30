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

	handlerToggleMenu(title: string) {
		const data = document.querySelectorAll('[name="hiddenContainerSection"]');
		for (let index = 0; index < data.length; index++) {
			const htmlData = data[index];
			const contentMenu = document.getElementById(htmlData.id);

			if (title === htmlData.id) {
				contentMenu?.classList.toggle("hidden");
			} else {
				contentMenu?.classList.add("hidden");
			}
		}
	}
}
