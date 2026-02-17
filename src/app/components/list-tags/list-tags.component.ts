import { Component, model } from "@angular/core";
import { IconsComponent } from "@components/icons/icons.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-list-tags",
	imports: [IconsComponent],
	standalone: true,
	templateUrl: "./list-tags.component.html",
})
export class ListTagsComponent {
	tags = model.required<RecordTags>();

	handlerDeleteTag(tag: string) {
		const nextTags = UtilityStorage.deleteTagLocalStorage(tag);
		this.tags.set(nextTags);
	}
}
