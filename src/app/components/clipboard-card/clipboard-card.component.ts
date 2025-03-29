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

	@Output() updateListItems = new EventEmitter();

	DEFAULT_COLOR = "bg-orange-200 hover:bg-orange-300";
	NEW_COLOR = "bg-green-200 hover:bg-green-300";

	delay = 200;
	urlContent = "";
	prefix = "view_paper_";
	delayAnimation = false;

	private getPaper() {
		return document.getElementById(this.prefix + this.id) as HTMLDivElement;
	}

	private changeBgColor() {
		const replaceClassName = (
			container: HTMLDivElement,
			target: string,
			replacer: string,
		) => {
			container.className = container.className.replaceAll(target, replacer);
		};

		const container = this.getPaper();
		replaceClassName(container, this.DEFAULT_COLOR, this.NEW_COLOR);

		setTimeout(() => {
			replaceClassName(container, this.NEW_COLOR, this.DEFAULT_COLOR);
			this.delayAnimation = false;
		}, this.delay);
	}

	deleteItem(_: Event, key: string) {
		console.log("Delete paper");
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
		const regex =
			/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
		const isUrl = regex.test(this.data);

		if (!isUrl) return;

		this.urlContent = this.data;
	}

	ngOnInit(): void {
		this.assignUrlOption();
	}
}
