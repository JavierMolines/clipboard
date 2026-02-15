type CheckboxStatus = "checked" | "";
type ClipboardViewMode = "grid" | "list";

declare interface RecordClipboard {
	id: string;
	time: string;
	data: string;
	title: string;
}

declare interface SettingsOptions {
	value: CheckboxStatus;
}

declare interface SettingsViewOptions {
	value: ClipboardViewMode;
}
