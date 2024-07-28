import { Component } from "@angular/core";
import { ClipboardListComponent } from "@components/clipboard-list/clipboard-list.component";
import { CreateItemClipComponent } from "@components/create-item-clip/create-item-clip.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-list",
	standalone: true,
	imports: [ClipboardListComponent, CreateItemClipComponent],
	templateUrl: "./list.component.html",
})
export default class ListComponent {
	hasItems = UtilityStorage.getMappingClipboardItems().length;
}
