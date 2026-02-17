/** biome-ignore-all lint/complexity/noBannedTypes: it necesary */
/** biome-ignore-all lint/suspicious/noExplicitAny: it necesary */
import { Component, input, model } from "@angular/core";

@Component({
	selector: "app-select-tags",
	imports: [],
	templateUrl: "./select-tags.component.html",
})
export class SelectTagsComponent {
	consumer = input.required<"clipboard-list" | "create">();
	inputSelectTag = model.required<string>();
	tags = model.required<RecordTags>();
	callback = input<any>();

	handlerChangeSelect(event: Event) {
		const fn = this.callback();

		if (!fn) return;

		if (this.consumer() === "clipboard-list") {
			fn(event);
		}

		if (this.consumer() === "create") {
			fn(event, "selectTag");
		}
	}
}
