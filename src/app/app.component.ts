import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-root",
	imports: [RouterModule],
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService: Meta,
	) {}

	ngOnInit() {
		// biome-ignore lint/complexity/noForEach: <explanation>
		const events = this.router.events.forEach((event) => {
			if (event instanceof NavigationEnd) {
				let currentRoute = this.activatedRoute;

				while (currentRoute.firstChild) {
					currentRoute = currentRoute.firstChild;
				}

				const routeData = currentRoute.snapshot.data;
				if (routeData["title"]) {
					this.titleService.setTitle(routeData["title"]);
				}
				if (routeData["description"]) {
					this.metaService.updateTag({
						name: "description",
						content: routeData["description"],
					});
				}
			}
		});
	}
}
