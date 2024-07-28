import { Component, signal } from "@angular/core";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_BUTTON_CHECK } from "src/app/constants/main";

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

		UtilityStorage.addOptionSettingsStorage(OPTIONS_BUTTON_CHECK, {
			value: newValue,
		});

		this.statusButtonCheck.set(newValue);
	}

	ngOnInit() {
		const buttonOption =
			UtilityStorage.getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);
		this.statusButtonCheck.set(buttonOption.value);
	}
}
