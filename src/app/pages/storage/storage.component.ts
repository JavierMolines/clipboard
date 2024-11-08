import { Component } from "@angular/core";

@Component({
	selector: "app-storage",
	standalone: true,
	imports: [],
	templateUrl: "./storage.component.html",
})
export default class StorageComponent {
	nameButtonOption = "Choose File";

	async eventChangeFile(event: Event) {
		// Validate data to get
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;
		const uploadedFile = input.files[0]; // Get file
		if (uploadedFile.type !== "application/json") return;
		this.nameButtonOption = uploadedFile.name;

		try {
			// Read and write content in localStorage
			const contentFile = await this.readFile(uploadedFile);
			const handlerString = typeof contentFile === "string" ? contentFile : "";
			const parseText = JSON.parse(handlerString);
			localStorage.clear();

			for (const key in parseText) {
				localStorage.setItem(key, parseText[key]);
			}

			window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	}

	private readFile(file: File) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				if (!event.target) {
					return reject("fail");
				}

				resolve(event.target.result);
			};

			reader.onerror = (error) => {
				console.log(error);
				reject("fail");
			};

			reader.readAsText(file);
		});
	}

	exportData() {
		const keysStorage = Object.keys(localStorage);
		const dataStorage = keysStorage.includes("data");

		if (!dataStorage) {
			console.log("Storage not valid");
			return;
		}

		const stringStorage = JSON.stringify(localStorage, null, "\t");
		const blob = new Blob([stringStorage], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");

		a.href = url;
		a.download = "storageExport.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
}
