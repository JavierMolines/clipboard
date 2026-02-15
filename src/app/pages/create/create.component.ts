import { AfterViewInit, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { focusDomById } from "@utils/dom";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";

@Component({
	selector: "app-create",
	imports: [ReactiveFormsModule],
	templateUrl: "./create.component.html",
})
export default class CreateComponent implements AfterViewInit {
	idTextInput = "clipboardArea";
	textArea = new FormControl("");
	titleInput = new FormControl("");

	constructor(private router: Router) {}

	clearForm() {
		this.textArea.reset();
		this.titleInput.reset();
		focusDomById(this.idTextInput);
	}

	sendMessage(message: string) {
		console.log(message);
	}

	buttonClick(event: Event) {
		event.preventDefault();

		const handlerTextArea = this.textArea.value?.trim() ?? "";
		const handlerTitleInput = this.titleInput.value?.trim() ?? "";

		if (handlerTextArea.length === 0) {
			this.sendMessage("Empty");
			return;
		}

		this.saveClipboard(handlerTextArea, handlerTitleInput);
	}

	saveClipboard(clipboard: string, title: string) {
		const isInsert = UtilityStorage.addLocalStorage(clipboard, title);

		if (!isInsert) {
			this.sendMessage("Not Save");
		}

		this.clearForm();

		const buttonOption =
			UtilityStorage.getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);
		if (buttonOption.value === "") return;
		this.router.navigate(["/"]);
	}

	ngAfterViewInit() {
		focusDomById(this.idTextInput);
	}
}
