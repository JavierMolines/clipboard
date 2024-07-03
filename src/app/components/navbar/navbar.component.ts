import { Component, ElementRef, ViewChild } from "@angular/core";
import {
	NavigationEnd,
	Router,
	RouterLinkWithHref,
	RouterModule,
} from "@angular/router";
import { datagram } from "./navbar.data";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [RouterLinkWithHref, RouterModule],
	templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
	MENU_OPTIONS = datagram;

	@ViewChild("menuSlide") menuSlide!: ElementRef;

	constructor(private router: Router) {}

	getMenuElement() {
		return this.menuSlide.nativeElement as HTMLDivElement;
	}

	handlerMenuToggle() {
		const menuElement = this.getMenuElement();
		menuElement.classList.toggle("hidden");
	}

	handlerNavigateMenuClose() {
		const menuElement = this.getMenuElement();
		const styles = JSON.stringify(menuElement.classList);
		if (/hidden/gi.test(styles)) return;
		menuElement.classList.add("hidden");
	}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.handlerNavigateMenuClose();
			}
		});
	}
}
