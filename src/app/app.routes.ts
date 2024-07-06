import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import CreateComponent from "@pages/create/create.component";
import ListComponent from "@pages/list/list.component";

export const routes: Routes = [
	{
		path: "",
		//loadComponent: () => import("@components/navbar/navbar.component"),
		component: NavbarComponent,
		children: [
			{
				path: "",
				//loadComponent: () => import("@pages/list/list.component") },
				component: ListComponent,
			},
			{
				path: "create",
				//loadComponent: () => import("@pages/create/create.component"),
				component: CreateComponent,
			},
			{
				path: "settings",
				loadComponent: () => import("@pages/settings/settings.component"),
			},
		],
	},
	{
		path: "not-found",
		loadComponent: () => import("@pages/404/404.component"),
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
