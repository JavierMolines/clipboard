import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import CreateComponent from "@pages/create/create.component";
//import EditorComponent from "@pages/editor/editor.component";
import ListComponent from "@pages/list/list.component";
import SettingsComponent from "@pages/settings/settings.component";
import StorageComponent from "@pages/storage/storage.component";

export const routes: Routes = [
	{
		path: "",
		//loadComponent: () => import("@components/navbar/navbar.component"),
		component: NavbarComponent,
		children: [
			{
				path: "",
				//loadComponent: () => import("@pages/list/list.component"),
				component: ListComponent,
			},
			{
				path: "create",
				//loadComponent: () => import("@pages/create/create.component"),
				component: CreateComponent,
			},
			{
				path: "settings",
				//loadComponent: () => import("@pages/settings/settings.component"),
				component: SettingsComponent,
			},
			{
				path: "storage",
				//loadComponent: () => import("@pages/storage/storage.component"),
				component: StorageComponent,
			},
			{
				path: "editor",
				loadComponent: () => import("@pages/editor/editor.component"),
				//component: EditorComponent,
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
