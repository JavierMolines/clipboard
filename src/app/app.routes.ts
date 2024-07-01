import type { Routes } from "@angular/router";
import { NavbarComponent } from "@components/navbar/navbar.component";
import { NotFoundComponent } from "@pages/404/404.component";
import { CreateComponent } from "@pages/create/create.component";
import { ListComponent } from "@pages/list/list.component";

export const routes: Routes = [
	{
		path: "",
		component: NavbarComponent,
		children: [
			{ path: "", component: ListComponent },
			{
				path: "create",
				component: CreateComponent,
			},
		],
	},
	{
		path: "**",
		component: NotFoundComponent,
	},
];
