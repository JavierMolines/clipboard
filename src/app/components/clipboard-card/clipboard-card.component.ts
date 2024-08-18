import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IconsComponent } from "@components/icons/icons.component";
import { UtilityStorage } from "@utils/storage/index.storage";
import { CreateItemClipComponent } from "../create-item-clip/create-item-clip.component";

@Component({
	selector: "app-clipboard-card",
	standalone: true,
	imports: [IconsComponent, CreateItemClipComponent],
	templateUrl: "./clipboard-card.component.html",
})
export class ClipboardCardComponent {
	@Input({ required: true }) id = "";
	@Input({ required: true }) time = "";
	@Input({ required: true }) data = "";
	@Input({ required: true }) title = "";

	@Output() updateListItems = new EventEmitter();

	deleteItem(event: Event, key: string) {
		event.stopPropagation();
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
