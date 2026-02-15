export const focusDomById = (id: string) => {
	try {
		const areaTextInput = document.getElementById(id) as HTMLElement;
		areaTextInput.focus();
	} catch {}
};
