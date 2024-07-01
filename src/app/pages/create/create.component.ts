import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { addLocalStorage } from "src/app/utils/localStorage";

@Component({
	selector: "app-create",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./create.component.html",
})
export class CreateComponent {
	textArea = new FormControl("");

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
	}
}
