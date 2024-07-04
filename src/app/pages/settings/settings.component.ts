import { Component, signal } from "@angular/core";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";
import {
	getOptionSettingsStorage,
	makeOptionSettingsStorage,
} from "src/app/utils/localStorage";

@Component({
	selector: "app-settings",
	standalone: true,
	imports: [],
	templateUrl: "./settings.component.html",
})
export default class SettingsComponent {
	statusButtonCheck = signal<CheckboxStatus>("");

	handlerClick() {
		const newValue = this.statusButtonCheck() === "checked" ? "" : "checked";

		makeOptionSettingsStorage(OPTIONS_BUTTON_CHECK, {
			value: newValue,
		});

		this.statusButtonCheck.set(newValue);
	}

	ngOnInit() {
		const buttonOption = getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);
		this.statusButtonCheck.set(buttonOption.value);
	}
}
