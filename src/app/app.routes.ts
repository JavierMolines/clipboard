import type { Routes } from "@angular/router";
import NavbarComponent from "@components/navbar/navbar.component";
import NotFoundComponent from "@pages/404/404.component";
import CreateComponent from "@pages/create/create.component";
import ListComponent from "@pages/list/list.component";
import ManageTagsComponent from "@pages/manage-tags/manage-tags.component";
import SettingsComponent from "@pages/settings/settings.component";
import StorageComponent from "@pages/storage/storage.component";
import { MAP_ROUTES } from "./constants/routes";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [
			{
				path: "",
				component: ListComponent,
				data: MAP_ROUTES["HOME"],
			},
			{
				path: "create",
				component: CreateComponent,
				data: MAP_ROUTES["CREATE"],
			},
			{
				path: "settings",
				component: SettingsComponent,
				data: MAP_ROUTES["SETTINGS"],
			},
			{
				path: "storage",
				component: StorageComponent,
				data: MAP_ROUTES["STORAGE"],
			},
			{
				path: "manage-tags",
				component: ManageTagsComponent,
				data: MAP_ROUTES["MANAGE_TAGS"],
			},
		],
	},
	{
		path: "not-found",
		component: NotFoundComponent,
		data: MAP_ROUTES["NOT_FOUND"],
	},
	{
		path: "**",
		redirectTo: "not-found",
		pathMatch: "full",
	},
];
