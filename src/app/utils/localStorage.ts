import { ID_CLIPBOARDS_ITEMS } from "../constants/main";
import { makeId } from "./methods";

const countLocalStorage = () => {
	try {
		const storage = getMappingClipboardItems();
		return storage.length;
	} catch (error) {
		return 0;
	}
};

const getItemLocalStorage = (key: string): RecordClipboard => {
	const handlerItem: RecordClipboard = JSON.parse(
		localStorage.getItem(key) ?? "{}",
	);
	return handlerItem;
};

const getMappingClipboardItems = (): Array<string> => {
	try {
		return JSON.parse(localStorage.getItem(ID_CLIPBOARDS_ITEMS) ?? "[]");
	} catch (error) {
		return [];
	}
};

const makeMapperClipboardItems = (data: Array<string>) => {
	return data.map((item) => {
		const partials = getItemLocalStorage(item);
		const record: RecordClipboard = {
			id: item,
			time: partials.time,
			data: partials.data,
		};

		return record;
	});
};

const addLocalStorage = (clipboard: string): boolean => {
	try {
		const keyGen = makeId();
		const dateNow = new Date();
		const record: RecordClipboard = {
			id: keyGen,
			time: `${dateNow.toLocaleDateString()}-${dateNow.toLocaleTimeString()}`,
			data: clipboard,
		};
		localStorage.setItem(keyGen, JSON.stringify(record));
		addMappingLocalStorage(keyGen);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const addMappingLocalStorage = (key: string) => {
	const globalData = getMappingClipboardItems();
	globalData.unshift(key);
	localStorage.setItem(ID_CLIPBOARDS_ITEMS, JSON.stringify(globalData));
};

const deleteItemLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
		const globalData = getMappingClipboardItems();
		const newData = globalData.filter((item) => item !== key);
		localStorage.setItem(ID_CLIPBOARDS_ITEMS, JSON.stringify(newData));
		return newData;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const makeOptionSettingsStorage = (key: string, data: SettingsOptions) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {}
};

const getOptionSettingsStorage = (key: string): SettingsOptions => {
	try {
		return JSON.parse(localStorage.getItem(key) ?? "");
	} catch (error) {
		return {
			value: "",
		};
	}
};

const checkExistInStorage = (key: string) => {
	try {
		JSON.parse(localStorage.getItem(key) ?? "");
		return true;
	} catch (error) {
		return false;
	}
};

export {
	checkExistInStorage,
	getOptionSettingsStorage,
	makeOptionSettingsStorage,
	makeMapperClipboardItems,
	getItemLocalStorage,
	getMappingClipboardItems,
	addLocalStorage,
	countLocalStorage,
	deleteItemLocalStorage,
};
