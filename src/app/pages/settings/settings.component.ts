import { Component, signal } from "@angular/core";
import { UtilityStorage } from "@utils/storage/index.storage";
import {
	OPTIONS_BUTTON_CHECK,
	OPTIONS_CLIPBOARD_VIEW,
} from "src/app/constants/main";

@Component({
	selector: "app-settings",
	imports: [],
	templateUrl: "./settings.component.html",
})
export default class SettingsComponent {
	statusButtonCheck = signal<CheckboxStatus>("");
	clipboardViewMode = signal<ClipboardViewMode>("grid");

	handlerClick() {
		const newValue = this.statusButtonCheck() === "checked" ? "" : "checked";

		UtilityStorage.addOptionSettingsStorage(OPTIONS_BUTTON_CHECK, {
			value: newValue,
		});

		this.statusButtonCheck.set(newValue);
	}

	handlerToggleViewMode() {
		const newMode = this.clipboardViewMode() === "grid" ? "list" : "grid";

		UtilityStorage.addViewOptionSettingsStorage(OPTIONS_CLIPBOARD_VIEW, {
			value: newMode,
		});

		this.clipboardViewMode.set(newMode);
	}

	ngOnInit() {
		const buttonOption =
			UtilityStorage.getOptionSettingsStorage(OPTIONS_BUTTON_CHECK);
		const viewOption = UtilityStorage.getViewOptionSettingsStorage(
			OPTIONS_CLIPBOARD_VIEW,
		);

		this.statusButtonCheck.set(buttonOption.value);
		this.clipboardViewMode.set(viewOption.value);
	}
}
