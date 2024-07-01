import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

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

	buttonClick() {
		const handlerTextArea = this.textArea.value?.trim() ?? "";

		if (handlerTextArea.length === 0) {
			console.log("Empty");
			return;
		}

		this.saveClipboard();
	}

	saveClipboard() {
		console.log("Save");
	}
}
