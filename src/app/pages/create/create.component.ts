import { AfterViewInit, Component, signal } from "@angular/core";
import { Router } from "@angular/router";
import { SelectTagsComponent } from "@components/select-tags/select-tags.component";
import { focusDomById } from "@utils/dom";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";

@Component({
	selector: "app-create",
	imports: [SelectTagsComponent],
	templateUrl: "./create.component.html",
})
export default class CreateComponent implements AfterViewInit {
	constructor(private router: Router) {}

	idTextInput = "clipboardArea";
	inputTextArea = signal("");
	inputTitle = signal("");
	inputSelectTag = signal("");
	tags = signal<RecordTags>([]);

	clearForm() {
		this.inputTextArea.set("");
		this.inputTitle.set("");
		this.inputSelectTag.set("");
		focusDomById(this.idTextInput);
	}

	handlerEventInput(
		event: Event,
		type: "textArea" | "titleInput" | "selectTag",
	) {
		const target = event.target as
			| HTMLSelectElement
			| HTMLInputElement
			| HTMLTextAreaElement;

		const value = target.value.trim() ?? "";

		switch (type) {
			case "textArea":
				this.inputTextArea.set(value);
				break;
			case "titleInput":
				this.inputTitle.set(value);
				break;
			case "selectTag":
				this.inputSelectTag.set(value);
				break;
		}
	}

	buttonClick(event: Event) {
		event.preventDefault();

		const valueTextArea = this.inputTextArea().trim() ?? "";
		const valueTitleInput = this.inputTitle().trim() ?? "";
		const valueSelectTag = this.inputSelectTag().trim() ?? "";

		if (valueTextArea.length === 0) {
			return;
		}

		this.saveClipboard(valueTextArea, valueTitleInput, valueSelectTag);
	}

	saveClipboard(clipboard: string, title: string, tag: string) {
		const { addLocalStorage, getOptionSettingsStorage } = UtilityStorage;
		const isInsert = addLocalStorage(clipboard, title, tag);

		if (!isInsert) return;

		this.clearForm();
		const buttonOption = getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);

		if (buttonOption.value === "") return;
		this.router.navigate(["/"]);
	}

	ngAfterViewInit() {
		this.tags.set(UtilityStorage.getMappingTagsItems());
		focusDomById(this.idTextInput);
	}
}
