type CheckboxStatus = "checked" | "";
type ClipboardViewMode = "grid" | "list";

declare interface RecordClipboard {
	id: string;
	time: string;
	data: string;
	title: string;
	tag?: string;
}

declare interface CardStyles {
	container: string;
	title: string;
	time: string;
	content: string;
	deleteButton: string;
	externalLinkButton: string;
	listRow?: string;
	listHeader?: string;
	listTitle?: string;
	listSeparator?: string;
	listContent?: string;
}

declare interface SettingsOptions {
	value: CheckboxStatus;
}

declare interface SettingsViewOptions {
	value: ClipboardViewMode;
}

declare interface RecordTag {
	name: string;
	color: string;
}

declare type RecordTags = Array<RecordTag>;
