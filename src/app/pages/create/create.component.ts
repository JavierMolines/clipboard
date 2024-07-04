import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";
import {
	addLocalStorage,
	getOptionSettingsStorage,
} from "src/app/utils/localStorage";

@Component({
	selector: "app-create",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./create.component.html",
})
export default class CreateComponent {
	textArea = new FormControl("");

	constructor(private router: Router) {}

	clearForm() {
		this.textArea.reset();
	}

	sendMessage(message: string) {
		console.log(message);
	}

	buttonClick() {
		const handlerTextArea = this.textArea.value?.trim() ?? "";

		if (handlerTextArea.length === 0) {
			this.sendMessage("Empty");
			return;
		}

		this.saveClipboard(handlerTextArea);
	}

	saveClipboard(clipboard: string) {
		const isInsert = addLocalStorage(clipboard);

		if (!isInsert) {
			this.sendMessage("Not Save");
		}

		this.clearForm();

		const buttonOption = getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);
		if (buttonOption.value === "") return;
		this.router.navigate(["/"]);
	}
}
