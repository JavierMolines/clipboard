import { Component } from "@angular/core";
import { ClipboardCardComponent } from "@components/clipboard-card/clipboard-card.component";
import {
	getItemLocalStorage,
	getMappingClipboardItems,
} from "src/app/utils/localStorage";

@Component({
	selector: "app-clipboard-list",
	standalone: true,
	imports: [ClipboardCardComponent],
	templateUrl: "./clipboard-list.component.html",
})
export class ClipboardListComponent {
	totalItems = getMappingClipboardItems().map((item) => {
		const partials = getItemLocalStorage(item);
		const record = {
			id: item,
			time: partials.time,
			data: partials.data,
		};

		return record;
	});
}
