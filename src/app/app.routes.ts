import type { Routes } from "@angular/router";
import { NavbarComponent } from "@components/navbar/navbar.component";
import { NotFoundComponent } from "@pages/404/404.component";
import { MainComponent } from "@pages/main/main.component";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [{ path: "", component: MainComponent }],
	},
	{
		path: "**",
		component: NotFoundComponent,
	},
];
