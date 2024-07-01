import { Component } from "@angular/core";
import { countLocalStorage } from "src/app/utils/localStorage";
import { ClipboardListComponent } from "@components/clipboard-list/clipboard-list.component";
import { CreateItemClipComponent } from "@components/create-item-clip/create-item-clip.component";

@Component({
	selector: "app-list",
	standalone: true,
	imports: [ClipboardListComponent, CreateItemClipComponent],
	templateUrl: "./list.component.html",
})
export class ListComponent {
	hasItems = countLocalStorage();
}
