export const URL_CONTENT_REGEX =
	/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

export const DEFAULT_COLOR_CLASSES = ["bg-orange-200", "hover:bg-orange-300"];
export const ACTIVE_COLOR_CLASSES = ["bg-green-200", "hover:bg-green-300"];

export const CARD_STYLES: Record<ClipboardViewMode, CardStyles> = {
	grid: {
		container:
			"select-none relative bg-orange-200 hover:bg-orange-300 break-words transition-all duration-200 cursor-pointer group pl-4 pr-8 py-2.5 rounded-lg overflow-ellipsis overflow-y-scroll h-[160px]",
		title: "text-lg font-semibold",
		time: "text-gray-700 text-xs",
		content: "",
		deleteButton:
			"absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-3 right-1.5 p-0.5 rounded-lg hover:bg-white focus:outline-none group",
		externalLinkButton:
			"absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-12 right-1.5 p-0.5 rounded-lg hover:bg-white",
	},
	list: {
		container:
			"select-none relative bg-orange-200 hover:bg-orange-300 transition-all duration-200 cursor-pointer group px-3 py-2 rounded-md w-full max-w-full overflow-hidden",
		title: "text-sm font-semibold leading-tight truncate pr-12",
		time: "block text-gray-700 text-xs leading-tight",
		content: "truncate pr-12 text-sm leading-tight",
		deleteButton:
			"absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-1/2 -translate-y-1/2 right-1.5 p-0.5 rounded-lg hover:bg-white focus:outline-none group",
		externalLinkButton:
			"absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-1/2 -translate-y-1/2 right-9 p-0.5 rounded-lg hover:bg-white",
		listRow:
			"w-full max-w-full overflow-hidden grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 pr-20 text-sm",
		listHeader: "min-w-0 flex items-center gap-2 overflow-hidden",
		listTitle:
			"shrink min-w-0 max-w-32 md:max-w-44 truncate text-sm font-semibold",
		listSeparator: "shrink-0 text-gray-500",
		listContent:
			"block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm",
	},
};
