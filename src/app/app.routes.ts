import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [
			{
				path: "",
				loadComponent: () =>
					import("@pages/list/list.component").then((m) => m.default),
				data: {
					title: "Clipboard",
					description:
						"Enhance your productivity with our clipboard management tool. Save, organize, and access your text snippets efficiently and quickly. Perfect for professionals, students, and anyone looking to improve their daily workflow.",
				},
			},
			{
				path: "create",
				loadComponent: () =>
					import("@pages/create/create.component").then((m) => m.default),
				data: {
					title: "Clipboard - create",
					description: "Create clipboard to later access from the main manager",
				},
			},
			{
				path: "settings",
				loadComponent: () =>
					import("@pages/settings/settings.component").then((m) => m.default),
				data: {
					title: "Clipboard - settings",
					description: "Configure how you would like to use the manager",
				},
			},
			{
				path: "storage",
				loadComponent: () =>
					import("@pages/storage/storage.component").then((m) => m.default),
				data: {
					title: "Clipboard - storage",
					description: "Back up or import your saved data",
				},
			},
		],
	},
	{
		path: "not-found",
		loadComponent: () =>
			import("@pages/404/404.component").then((m) => m.default),
		data: { title: "Clipboard - not found", description: "Page not found" },
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
