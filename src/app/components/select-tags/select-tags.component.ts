/** biome-ignore-all lint/complexity/noBannedTypes: it necesary */
/** biome-ignore-all lint/suspicious/noExplicitAny: it necesary */
import { Component, input, model } from "@angular/core";

@Component({
	selector: "app-select-tags",
	imports: [],
	templateUrl: "./select-tags.component.html",
})
export class SelectTagsComponent {
	tags = model.required<RecordTags>();
	callback = input<any>();

	handlerChangeSelect(event: Event) {
		const fn = this.callback();

		if (fn) {
			fn(event, "selectTag");
			return;
		}
	}
}
