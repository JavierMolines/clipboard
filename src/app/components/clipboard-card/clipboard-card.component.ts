import { Component, Input } from "@angular/core";
import { deleteItemLocalStorage } from "src/app/utils/localStorage";

@Component({
	selector: "app-clipboard-card",
	standalone: true,
	imports: [],
	templateUrl: "./clipboard-card.component.html",
})
export class ClipboardCardComponent {
	@Input({ required: true }) id = "";
	@Input({ required: true }) time = "";
	@Input({ required: true }) data = "";

	deleteItem(key: string) {
		const hasDelete = deleteItemLocalStorage(key);

		if (!hasDelete) {
			console.log("Failed delete.");
		}
	}
}
