interface RecordClipboard {
	id: string;
	time: string;
	data: string;
}

type CheckboxStatus = "checked" | "";

interface SettingsOptions {
	value: CheckboxStatus;
}
