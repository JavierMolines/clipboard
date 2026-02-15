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
	@Input() viewMode: ClipboardViewMode = "grid";

	@Output() updateListItems = new EventEmitter();

	DEFAULT_COLOR = "bg-orange-200 hover:bg-orange-300";
	NEW_COLOR = "bg-green-200 hover:bg-green-300";

	delay = 200;
	urlContent = "";
	prefix = "view_paper_";
	delayAnimation = false;

	get cardContainerClass() {
		if (this.viewMode === "list") {
			return "select-none relative bg-orange-200 hover:bg-orange-300 transition-all duration-200 cursor-pointer group px-3 py-2 rounded-md w-full max-w-full overflow-hidden";
		}

		return "select-none relative bg-orange-200 hover:bg-orange-300 break-words transition-all duration-200 cursor-pointer group pl-4 pr-8 py-2.5 rounded-lg overflow-ellipsis overflow-y-scroll h-[160px]";
	}

	get titleClass() {
		if (this.viewMode === "list") {
			return "text-sm font-semibold leading-tight truncate pr-12";
		}

		return "text-lg font-semibold";
	}

	get timeClass() {
		if (this.viewMode === "list") {
			return "block text-gray-700 text-xs leading-tight";
		}

		return "text-gray-700 text-xs";
	}

	get contentClass() {
		if (this.viewMode === "list") {
			return "truncate pr-12 text-sm leading-tight";
		}

		return "";
	}

	get deleteButtonClass() {
		if (this.viewMode === "list") {
			return "absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-1/2 -translate-y-1/2 right-1.5 p-0.5 rounded-lg hover:bg-white focus:outline-none group";
		}

		return "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-3 right-1.5 p-0.5 rounded-lg hover:bg-white focus:outline-none group";
	}

	get externalLinkButtonClass() {
		if (this.viewMode === "list") {
			return "absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-1/2 -translate-y-1/2 right-9 p-0.5 rounded-lg hover:bg-white";
		}

		return "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-12 right-1.5 p-0.5 rounded-lg hover:bg-white";
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

		const defaultClasses = this.DEFAULT_COLOR.split(" ");
		const newClasses = this.NEW_COLOR.split(" ");

		container.classList.remove(...defaultClasses);
		container.classList.add(...newClasses);

		setTimeout(() => {
			container.classList.remove(...newClasses);
			container.classList.add(...defaultClasses);
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
