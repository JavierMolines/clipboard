import { Component, signal } from "@angular/core";
import { ClipboardCardComponent } from "@components/clipboard-card/clipboard-card.component";
import {
	getMappingClipboardItems,
	makeMapperClipboardItems,
} from "src/app/utils/localStorage";

@Component({
	selector: "app-clipboard-list",
	standalone: true,
	imports: [ClipboardCardComponent],
	templateUrl: "./clipboard-list.component.html",
})
export class ClipboardListComponent {
	totalItems = signal(makeMapperClipboardItems(getMappingClipboardItems()));

	updateListItems(newList: Array<RecordClipboard>) {
		this.totalItems.set(newList);
	}
}
