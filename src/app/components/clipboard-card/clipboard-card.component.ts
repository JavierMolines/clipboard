import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UtilityStorage } from "@utils/storage/index.storage";

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
		const newList = UtilityStorage.addMapperClipboardItems(
			UtilityStorage.deleteItemLocalStorage(key),
		);
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
