import {
	Component,
	computed,
	ElementRef,
	HostListener,
	signal,
	ViewChild,
} from "@angular/core";
import { ClipboardCardComponent } from "@components/clipboard-card/clipboard-card.component";
import { SelectTagsComponent } from "@components/select-tags/select-tags.component";
import { UtilityStorage } from "@utils/storage/index.storage";
import { OPTIONS_CLIPBOARD_VIEW } from "src/app/constants/main";

@Component({
	selector: "app-clipboard-list",
	imports: [ClipboardCardComponent, SelectTagsComponent],
	standalone: true,
	templateUrl: "./clipboard-list.component.html",
})
export class ClipboardListComponent {
	private itemsPerPage = 12;

	searchContent = signal("");
	currentPage = signal(1);
	maxPages = signal(1);
	tags = signal<RecordTags>([]);
	clipboardViewMode = signal<ClipboardViewMode>("grid");
	viewItems = signal<Array<RecordClipboard>>([]);
	isListView = computed(() => this.clipboardViewMode() === "list");
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
		const tags = UtilityStorage.getMappingTagsItems();
		const viewOption = UtilityStorage.getViewOptionSettingsStorage(
			OPTIONS_CLIPBOARD_VIEW,
		);

		this.clipboardViewMode.set(viewOption.value);
		this.tags.set(tags);

		const items = this.totalItems();
		this.maxPages.set(this.getMaxPages(items));
		this.viewItems.set(items.slice(0, this.itemsPerPage));
	}

	getMaxPages(items: Array<RecordClipboard>): number {
		return Math.ceil(items.length / this.itemsPerPage);
	}

	nextPage() {
		const nextPage = this.currentPage() + 1;
		const maxPage = this.maxPages();
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
		let items: Array<RecordClipboard> = [];
		const value = this.searchContent();

		if (value !== "") {
			const regExp = new RegExp(this.searchContent(), "ig");
			const validateExpressionMatch = (content: string) => regExp.test(content);
			items = this.totalItems().filter(
				(item) =>
					validateExpressionMatch(item.data) ||
					validateExpressionMatch(item.title),
			);
		} else {
			items = this.totalItems();
		}

		const modifyCurrent = this.currentPage() - 1;
		const initSection = modifyCurrent * this.itemsPerPage;
		const endSection = initSection + this.itemsPerPage;
		this.maxPages.set(this.getMaxPages(items));
		this.viewItems.set(items.slice(initSection, endSection));
	}

	onSearchContent() {
		const searchValue = this.input.nativeElement.value.toLowerCase().trim();
		this.searchContent.set(searchValue);
		this.currentPage.set(1);
		this.movePage();
	}

	// Use: from ClipboardCardComponent
	updateListItems(newList: Array<RecordClipboard>) {
		this.totalItems.set(newList);
		const newMaxPage = this.getMaxPages(newList);

		if (this.currentPage() > newMaxPage) {
			this.currentPage.set(newMaxPage);
		}

		this.movePage();
	}
}
