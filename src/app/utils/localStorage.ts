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
		return JSON.parse(localStorage.getItem("data") ?? "[]");
	} catch (error) {
		return [];
	}
};

const addLocalStorage = (clipboard: string): boolean => {
	try {
		const keyGen = makeId();
		const record: RecordClipboard = {
			time: new Date().toLocaleDateString(),
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
	globalData.push(key);
	localStorage.setItem("data", JSON.stringify(globalData));
};

const deleteItemLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
		const globalData = getMappingClipboardItems();
		const newData = globalData.filter((item) => item !== key);
		localStorage.setItem("data", JSON.stringify(newData));
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export {
	getItemLocalStorage,
	getMappingClipboardItems,
	addLocalStorage,
	countLocalStorage,
	deleteItemLocalStorage,
};
