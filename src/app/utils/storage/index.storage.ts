import { ID_CLIPBOARDS_ITEMS } from "src/app/constants/main";
import { makeId } from "../methods";

// biome-ignore lint/complexity/noStaticOnlyClass: it necesary
export class UtilityStorage {
	static getOptionSettingsStorage(key: string): SettingsOptions {
		try {
			return JSON.parse(localStorage.getItem(key) ?? "");
		} catch {
			return {
				value: "",
			};
		}
	}

	static getItemLocalStorage(key: string): RecordClipboard {
		const handlerItem: RecordClipboard = JSON.parse(
			localStorage.getItem(key) ?? "{}",
		);
		return handlerItem;
	}

	static getMappingClipboardItems(): Array<string> {
		try {
			return JSON.parse(localStorage.getItem(ID_CLIPBOARDS_ITEMS) ?? "[]");
		} catch {
			return [];
		}
	}

	static addMapperClipboardItems(data: Array<string>) {
		return data.map((item) => {
			const partials = UtilityStorage.getItemLocalStorage(item);
			const record: RecordClipboard = {
				id: item,
				time: partials.time,
				data: partials.data,
				title: partials.title,
			};

			return record;
		});
	}

	static deleteItemLocalStorage(key: string) {
		try {
			localStorage.removeItem(key);
			const globalData = UtilityStorage.getMappingClipboardItems();
			const newData = globalData.filter((item) => item !== key);
			localStorage.setItem(ID_CLIPBOARDS_ITEMS, JSON.stringify(newData));
			return newData;
		} catch {
			return [];
		}
	}

	static checkExistInStorage(key: string) {
		try {
			JSON.parse(localStorage.getItem(key) ?? "");
			return true;
		} catch {
			return false;
		}
	}

	static addOptionSettingsStorage(key: string, data: SettingsOptions) {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch {}
	}

	static getViewOptionSettingsStorage(key: string): SettingsViewOptions {
		const defaultValue: SettingsViewOptions = {
			value: "grid",
		};

		try {
			const valueStorage = JSON.parse(localStorage.getItem(key) ?? "");
			defaultValue.value = valueStorage.value;
		} catch {}

		return defaultValue;
	}

	static addViewOptionSettingsStorage(key: string, data: SettingsViewOptions) {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch {}
	}

	static generateRecordClipboard(
		clipboard: string,
		title: string,
		keyGen: string,
	): RecordClipboard {
		const dateNow = new Date();
		const record: RecordClipboard = {
			id: keyGen,
			time: `${dateNow.toLocaleDateString()}-${dateNow.toLocaleTimeString()}`,
			data: clipboard,
			title,
		};
		return record;
	}

	static addLocalStorage(clipboard: string, title: string): boolean {
		try {
			const keyGen = makeId();
			const record = UtilityStorage.generateRecordClipboard(
				clipboard,
				title,
				keyGen,
			);
			localStorage.setItem(keyGen, JSON.stringify(record));
			UtilityStorage.addMappingLocalStorage(keyGen);
			return true;
		} catch {
			return false;
		}
	}

	static addMappingLocalStorage(key: string) {
		try {
			const globalData = UtilityStorage.getMappingClipboardItems();
			globalData.unshift(key);
			localStorage.setItem(ID_CLIPBOARDS_ITEMS, JSON.stringify(globalData));
		} catch {}
	}

	static makeMocksLoadItems = () => {
		const items = Array.from({ length: 100 }, () =>
			Math.floor(Math.random() * 100).toString(),
		);
		for (const item of items) {
			UtilityStorage.addLocalStorage(item, "");
		}
	};
}
