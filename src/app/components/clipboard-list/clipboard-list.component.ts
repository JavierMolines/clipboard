import { Component, signal } from "@angular/core";
import { ClipboardCardComponent } from "@components/clipboard-card/clipboard-card.component";
import { UtilityStorage } from "@utils/storage/index.storage";

@Component({
	selector: "app-clipboard-list",
	standalone: true,
	imports: [ClipboardCardComponent],
	templateUrl: "./clipboard-list.component.html",
})
export class ClipboardListComponent {
	currentPage = signal(1);
	maxPages = signal(1);
	viewItems = signal<Array<RecordClipboard>>([]);
	totalItems = signal(
		UtilityStorage.addMapperClipboardItems(
			UtilityStorage.getMappingClipboardItems(),
		),
	);

	ngOnInit() {
		this.maxPages.set(this.getMaxPages());
		this.viewItems.set(this.totalItems().slice(0, 12));
	}

	getMaxPages() {
		return Math.ceil(this.totalItems().length / 12);
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
		const initSection = modifyCurrent * 12;
		const endSection = initSection + 12;
		this.viewItems.set(this.totalItems().slice(initSection, endSection));
	}

	updateListItems(newList: Array<RecordClipboard>) {
		this.totalItems.set(newList);
		const newMaxPage = Math.ceil(newList.length / 12);

		if (this.currentPage() > newMaxPage) {
			this.currentPage.set(newMaxPage);
		}

		this.maxPages.set(newMaxPage);
		this.movePage();
	}
}
