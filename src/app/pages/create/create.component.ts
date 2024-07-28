import { AfterViewInit, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";

@Component({
	selector: "app-create",
	standalone: true,
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
		this.focusTextArea();
	}

	sendMessage(message: string) {
		console.log(message);
	}

	buttonClick() {
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

	focusTextArea() {
		try {
			const areaTextInput = document.getElementById(
				this.idTextInput,
			) as HTMLTextAreaElement;
			areaTextInput.focus();
		} catch (error) {}
	}

	ngAfterViewInit() {
		this.focusTextArea();
	}

	// Function to generate random data to localStorage
	/* modelsLoadItems() {
		const items = Array.from({ length: 100 }, () =>
			Math.floor(Math.random() * 100).toString(),
		);
		for (const item of items) {
			addLocalStorage(item);
		}
	} */
}
