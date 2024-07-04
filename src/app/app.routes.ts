import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("@components/navbar/navbar.component"),
		children: [
			{ path: "", loadComponent: () => import("@pages/list/list.component") },
			{
				path: "create",
				loadComponent: () => import("@pages/create/create.component"),
			},
			{
				path: "settings",
				loadComponent: () => import("@pages/settings/settings.component"),
			},
		],
	},
	{
		path: "**",
		loadComponent: () => import("@pages/404/404.component"),
	},
];
