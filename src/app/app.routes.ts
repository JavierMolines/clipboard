import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import { MAP_ROUTES } from "./constants/routes";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [
			{
				path: "",
				loadComponent: () =>
					import("@pages/list/list.component").then((m) => m.default),
				data: MAP_ROUTES["HOME"],
			},
			{
				path: "create",
				loadComponent: () =>
					import("@pages/create/create.component").then((m) => m.default),
				data: MAP_ROUTES["CREATE"],
			},
			{
				path: "settings",
				loadComponent: () =>
					import("@pages/settings/settings.component").then((m) => m.default),
				data: MAP_ROUTES["SETTINGS"],
			},
			{
				path: "storage",
				loadComponent: () =>
					import("@pages/storage/storage.component").then((m) => m.default),
				data: MAP_ROUTES["STORAGE"],
			},
		],
	},
	{
		path: "not-found",
		loadComponent: () =>
			import("@pages/404/404.component").then((m) => m.default),
		data: MAP_ROUTES["NOT_FOUND"],
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
