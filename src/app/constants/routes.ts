import type { Data } from "@angular/router";

export const MAP_ROUTES: Record<string, Data> = {
	HOME: {
		title: "Clipboard",
		description:
			"Enhance your productivity with our clipboard management tool. Save, organize, and access your text snippets efficiently and quickly. Perfect for professionals, students, and anyone looking to improve their daily workflow.",
	},
	CREATE: {
		title: "Clipboard - create",
		description: "Create clipboard to later access from the main manager",
	},
	SETTINGS: {
		title: "Clipboard - settings",
		description: "Configure how you would like to use the manager",
	},
	STORAGE: {
		title: "Clipboard - storage",
		description: "Back up or import your saved data",
	},
	MANAGE_TAGS: {
		title: "Clipboard - manage tags",
		description: "Create and remove tags for your clipboard organization",
	},
	NOT_FOUND: { title: "Clipboard - not found", description: "Page not found" },
};
