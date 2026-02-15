import { Component, signal } from "@angular/core";
import { IconsComponent } from "@components/icons/icons.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-manage-tags",
	imports: [IconsComponent],
	templateUrl: "./manage-tags.component.html",
})
export default class ManageTagsComponent {
	tagInputValue = signal("");
	tags = signal<RecordTags>([]);
	minLengthTag = 4;

	isValidTagInput() {
		return this.tagInputValue().trim().length >= this.minLengthTag;
	}

	handlerInputTag(event: Event) {
		const target = event.target as HTMLInputElement;
		this.tagInputValue.set(target.value);
	}

	handlerAddTag() {
		if (!this.isValidTagInput()) {
			return;
		}

		const nextTags = UtilityStorage.addTagLocalStorage(this.tagInputValue());
		this.tags.set(nextTags);
		this.tagInputValue.set("");
	}

	handlerDeleteTag(tag: string) {
		const nextTags = UtilityStorage.deleteTagLocalStorage(tag);
		this.tags.set(nextTags);
	}

	ngOnInit() {
		this.tags.set(UtilityStorage.getMappingTagsItems());
	}
}
