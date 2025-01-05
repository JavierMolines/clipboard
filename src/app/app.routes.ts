import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import NotFoundComponent from "@pages/404/404.component";
import CreateComponent from "@pages/create/create.component";
import ListComponent from "@pages/list/list.component";
import SettingsComponent from "@pages/settings/settings.component";
import StorageComponent from "@pages/storage/storage.component";

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
				component: SettingsComponent,
				data: {
					title: "Clipboard - settings",
					description: "Configure how you would like to use the manager",
				},
			},
			{
				path: "storage",
				component: StorageComponent,
				data: {
					title: "Clipboard - storage",
					description: "Back up or import your saved data",
				},
			},
		],
	},
	{
		path: "not-found",
		component: NotFoundComponent,
		data: { title: "Clipboard - not found", description: "Page not found" },
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
