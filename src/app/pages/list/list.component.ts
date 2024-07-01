import { Component } from "@angular/core";
import { countLocalStorage } from "src/app/utils/localStorage";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-list",
	standalone: true,
	imports: [RouterModule],
	templateUrl: "./list.component.html",
})
export class ListComponent {
	hasItems = countLocalStorage();
}
