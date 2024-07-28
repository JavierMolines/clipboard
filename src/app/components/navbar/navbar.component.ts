import { Component, ElementRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { NavbarOptionComponent } from "@components/navbar-option/navbar-option.component";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";
import { options } from "./navbar.data";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [RouterModule, NavbarOptionComponent],
	templateUrl: "./navbar.component.html",
})
export default class NavbarComponent {
	MENU_OPTIONS = options;

	@ViewChild("menuSlide") menuSlide!: ElementRef;

	constructor(private router: Router) {}

	getMenuElement() {
		return this.menuSlide.nativeElement as HTMLDivElement;
	}

	handlerMenuToggle() {
		const menuElement = this.getMenuElement();
		menuElement.classList.toggle("hidden");
		menuElement.classList.toggle("flex");
	}

	handlerNavigateMenuClose() {
		const menuElement = this.getMenuElement();
		const styles = JSON.stringify(menuElement.classList);
		if (/hidden/gi.test(styles)) return;
		menuElement.classList.add("hidden");
		menuElement.classList.remove("flex");
	}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.handlerNavigateMenuClose();
			}
		});

		if (!UtilityStorage.checkExistInStorage(OPTIONS_BUTTON_CHECK)) {
			UtilityStorage.addOptionSettingsStorage(OPTIONS_BUTTON_CHECK, {
				value: "checked",
			});
		}
	}
}
