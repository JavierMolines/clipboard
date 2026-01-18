import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	HostListener,
	signal,
	ViewChild,
} from "@angular/core";
import { ClipboardCardComponent } from "@components/clipboard-card/clipboard-card.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-clipboard-list",
	imports: [ClipboardCardComponent],
	templateUrl: "./clipboard-list.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardListComponent {
	private itemsPerPage = 12;
	currentPage = signal(1);
	maxPages = signal(1);
	viewItems = signal<Array<RecordClipboard>>([]);
	totalItems = signal(
		UtilityStorage.addMapperClipboardItems(
			UtilityStorage.getMappingClipboardItems(),
		),
	);
	handlerSearchContent = computed(
		() => this.totalItems().length > this.itemsPerPage,
	);

	@ViewChild("searchContent") input!: ElementRef<HTMLInputElement>;

	@HostListener("window:keydown", ["$event"])
	onKeydown(event: KeyboardEvent) {
		if (
			event.ctrlKey &&
			event.key.toLowerCase() === "k" &&
			this.handlerSearchContent()
		) {
			event.preventDefault();
			this.input.nativeElement.focus();
		}
	}

	ngOnInit() {
		this.maxPages.set(this.getMaxPages());
		this.viewItems.set(this.totalItems().slice(0, this.itemsPerPage));
	}

	getMaxPages() {
		return Math.ceil(this.totalItems().length / this.itemsPerPage);
	}

	nextPage() {
		const nextPage = this.currentPage() + 1;
		const maxPage = this.getMaxPages();
		const newPage = nextPage > maxPage ? maxPage : nextPage;
		this.currentPage.set(newPage);
		this.movePage();
	}

	prevPage() {
		const prevPage = this.currentPage() - 1;
		const newPage = prevPage < 1 ? 1 : prevPage;
		this.currentPage.set(newPage);
		this.movePage();
	}

	movePage() {
		const modifyCurrent = this.currentPage() - 1;
		const initSection = modifyCurrent * this.itemsPerPage;
		const endSection = initSection + this.itemsPerPage;
		this.viewItems.set(this.totalItems().slice(initSection, endSection));
	}

	updateListItems(newList: Array<RecordClipboard>) {
		this.totalItems.set(newList);
		const newMaxPage = Math.ceil(newList.length / this.itemsPerPage);

		if (this.currentPage() > newMaxPage) {
			this.currentPage.set(newMaxPage);
		}

		this.maxPages.set(newMaxPage);
		this.movePage();
	}
}
