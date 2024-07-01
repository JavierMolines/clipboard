import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
	deleteItemLocalStorage,
	makeMapperClipboardItems,
} from "src/app/utils/localStorage";

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

	@Output() updateListItems = new EventEmitter();

	deleteItem(key: string) {
		const newList = makeMapperClipboardItems(deleteItemLocalStorage(key));
		this.updateListItems.emit(newList);
	}

	loadClipboard(data: string) {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				console.log("Copy finish");
			})
			.catch((err) => {
				console.error("Error copy", err);
			});
	}
}
