import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { IconsComponent } from "@components/icons/icons.component";
import { copyClipboard } from "@utils/methods";
import { UtilityStorage } from "@utils/storage/index.storage";
import {
	ACTIVE_COLOR_CLASSES,
	CARD_STYLES,
	DEFAULT_COLOR_CLASSES,
	URL_CONTENT_REGEX,
} from "./clipboard-card.config";

@Component({
	selector: "app-clipboard-card",
	imports: [IconsComponent],
	templateUrl: "./clipboard-card.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardCardComponent implements OnInit {
	@Input({ required: true }) id = "";
	@Input({ required: true }) time = "";
	@Input({ required: true }) data = "";
	@Input({ required: true }) title = "";
	@Input() viewMode: ClipboardViewMode = "grid";

	@Output() updateListItems = new EventEmitter();

	readonly styleByMode = CARD_STYLES;
	readonly defaultColorClasses = DEFAULT_COLOR_CLASSES;
	readonly activeColorClasses = ACTIVE_COLOR_CLASSES;

	delay = 200;
	urlContent = "";
	prefix = "view_paper_";
	delayAnimation = false;

	get isListView() {
		return this.viewMode === "list";
	}

	get styles() {
		return this.styleByMode[this.viewMode];
	}

	private getPaper() {
		return document.getElementById(this.prefix + this.id) as HTMLDivElement;
	}

	private changeBgColor() {
		const container = this.getPaper();
		if (!container) {
			this.delayAnimation = false;
			return;
		}

		container.classList.remove(...this.defaultColorClasses);
		container.classList.add(...this.activeColorClasses);

		setTimeout(() => {
			container.classList.remove(...this.activeColorClasses);
			container.classList.add(...this.defaultColorClasses);
			this.delayAnimation = false;
		}, this.delay);
	}

	deleteItem(_: Event, key: string) {
		const newList = UtilityStorage.addMapperClipboardItems(
			UtilityStorage.deleteItemLocalStorage(key),
		);
		this.updateListItems.emit(newList);
	}

	loadClipboard(data: string) {
		copyClipboard(data);

		if (this.delayAnimation) {
			return;
		}

		this.delayAnimation = true;
		this.changeBgColor();
	}

	assignUrlOption() {
		const isUrl = URL_CONTENT_REGEX.test(this.data);

		if (!isUrl) return;

		this.urlContent = this.data;
	}

	ngOnInit(): void {
		this.assignUrlOption();
	}
}
