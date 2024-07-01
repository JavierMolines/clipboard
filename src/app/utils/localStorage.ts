import { makeId } from "./methods";

export const countLocalStorage = () => {
	try {
		return localStorage.length;
	} catch (error) {
		return 0;
	}
};

export const addLocalStorage = (clipboard: string): boolean => {
	try {
		const record: RecordClipboard = {
			time: new Date().toLocaleDateString(),
			data: clipboard,
		};
		localStorage.setItem(makeId(), JSON.stringify(record));
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
