import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import CreateComponent from "@pages/create/create.component";
import ListComponent from "@pages/list/list.component";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [
			{
				path: "",
				component: ListComponent,
				data: {
					title: "Clipboard",
					description:
						"Enhance your productivity with our clipboard management tool. Save, organize, and access your text snippets efficiently and quickly. Perfect for professionals, students, and anyone looking to improve their daily workflow.",
				},
			},
			{
				path: "create",
				component: CreateComponent,
				data: {
					title: "Clipboard - create",
					description: "Create clipboard to later access from the main manager",
				},
			},
			{
				path: "settings",
				loadComponent: () => import("@pages/settings/settings.component"),
				data: {
					title: "Clipboard - settings",
					description: "Configure how you would like to use the manager",
				},
			},
			{
				path: "storage",
				loadComponent: () => import("@pages/storage/storage.component"),
				data: {
					title: "Clipboard - storage",
					description: "Back up or import your saved data",
				},
			},
			{
				path: "editor",
				loadComponent: () => import("@pages/editor/editor.component"),
				data: {
					title: "Clipboard - editor",
					description:
						"Use the editor to manage different protocols for data management",
				},
			},
		],
	},
	{
		path: "not-found",
		loadComponent: () => import("@pages/404/404.component"),
		data: { title: "Clipboard - not found", description: "Page not found" },
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
