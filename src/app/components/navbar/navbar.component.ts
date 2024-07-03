import { Component, ElementRef, ViewChild } from "@angular/core";
import {
	Router,
	NavigationEnd,
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

	handlerMenuToggle() {
		const menuElement = this.menuSlide.nativeElement as HTMLDivElement;
		menuElement.classList.toggle("hidden");
	}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.handlerMenuToggle();
			}
		});
	}
}
