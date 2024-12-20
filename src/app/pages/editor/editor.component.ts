import { Component, signal } from "@angular/core";
import { copyClipboard } from "@utils/methods";

@Component({
	selector: "app-settings",
	imports: [],
	templateUrl: "./editor.component.html",
})
export default class EditorComponent {
	jsonValid = signal(false);

	tai = "tain";
	tao = "taou";
	buttonsJson = {
		min: "button-minify",
		beu: "button-beutify",
	};

	private encode(input: string) {
		const utf8Bytes = new TextEncoder().encode(input);
		return btoa(String.fromCharCode(...utf8Bytes));
	}

	private decode(base64: string) {
		const binaryString = atob(base64);
		const utf8Bytes = Uint8Array.from(binaryString, (char) =>
			char.charCodeAt(0),
		);
		return new TextDecoder().decode(utf8Bytes);
	}

	private getDomTextArea(id: string) {
		return document.getElementById(id) as HTMLTextAreaElement;
	}

	private handlerParser(flow: "decode" | "encode") {
		const input = this.getDomTextArea(this.tai);

		if (input.value.trim() === "") {
			alert("Insert text..");
			return;
		}

		const value = input.value;
		const encode = flow === "encode" ? this.encode(value) : this.decode(value);
		const output = this.getDomTextArea(this.tao);

		output.value = encode;
	}

	private handlerJsonMethods(flow: "minify" | "clean") {
		if (!this.jsonValid()) {
			return;
		}

		try {
			const input = this.getDomTextArea(this.tai);
			const output = this.getDomTextArea(this.tao);
			const json = JSON.parse(input.value);

			const format =
				flow === "clean"
					? JSON.stringify(json, null, "\t")
					: JSON.stringify(json);

			output.value = format;
		} catch (error) {}
	}

	onChangeTextArea() {
		const input = this.getDomTextArea(this.tai);
		const buttonsJson = document.querySelectorAll(".to-json");

		try {
			JSON.parse(input.value);
			this.jsonValid.set(true);
			for (let index = 0; index < buttonsJson.length; index++) {
				const button = buttonsJson[index] as HTMLButtonElement;
				button.classList.remove("bg-gray-300");
				button.classList.add("bg-orange-300");
				button.classList.add("hover:bg-orange-400");
				button.classList.add("cursor-pointer");
			}
		} catch (error) {
			this.jsonValid.set(false);
			for (let index = 0; index < buttonsJson.length; index++) {
				const button = buttonsJson[index] as HTMLButtonElement;
				button.classList.remove("bg-orange-300");
				button.classList.remove("hover:bg-orange-400");
				button.classList.add("bg-gray-300");
				button.classList.remove("cursor-pointer");
			}
		}
	}

	onClickCopyClipboard() {
		const output = this.getDomTextArea(this.tao);

		if (output.value.trim() === "") {
			return;
		}

		copyClipboard(output.value);
	}

	onClickEncode() {
		this.handlerParser("encode");
	}

	onClickDecode() {
		this.handlerParser("decode");
	}

	onClickBeautify() {
		this.handlerJsonMethods("clean");
	}

	onClickMinify() {
		this.handlerJsonMethods("minify");
	}
}
