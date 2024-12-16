import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IconsComponent } from "@components/icons/icons.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-clipboard-card",
	imports: [IconsComponent],
	templateUrl: "./clipboard-card.component.html",
})
export class ClipboardCardComponent implements OnInit {
	@Input({ required: true }) id = "";
	@Input({ required: true }) time = "";
	@Input({ required: true }) data = "";
	@Input({ required: true }) title = "";

	@Output() updateListItems = new EventEmitter();

	urlContent = "";

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

	assignUrlOption() {
		const regex =
			/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
		const isUrl = regex.test(this.data);

		if (!isUrl) return;

		this.urlContent = this.data;
	}

	ngOnInit(): void {
		this.assignUrlOption();
	}
}
