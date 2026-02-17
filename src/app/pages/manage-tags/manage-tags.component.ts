import { AfterViewInit, Component, signal } from "@angular/core";
import { ListTagsComponent } from "@components/list-tags/list-tags.component";
import { focusDomById } from "@utils/dom";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-manage-tags",
	imports: [ListTagsComponent],
	standalone: true,
	templateUrl: "./manage-tags.component.html",
})
export default class ManageTagsComponent implements AfterViewInit {
	idTextInput = "inputTagNameCreate";
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

	ngAfterViewInit() {
		this.tags.set(UtilityStorage.getMappingTagsItems());
		focusDomById(this.idTextInput);
	}
}
