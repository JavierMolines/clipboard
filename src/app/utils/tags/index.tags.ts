import { generateRandomHexColor, getValidHexColor } from "./colors.tags";

const existTagByName = (data: RecordTags, tagName: string) => {
	return data.some((item) => item.name.toLowerCase() === tagName.toLowerCase());
};

const normalizeTagItem = (item: unknown) => {
	if (typeof item === "string") {
		const name = item.trim();

		if (name === "") {
			return { record: null, updated: true };
		}

		return {
			record: {
				name,
				color: generateRandomHexColor(),
			},
			updated: true,
		};
	}

	if (
		typeof item !== "object" ||
		item === null ||
		!("name" in item) ||
		typeof item.name !== "string"
	) {
		return { record: null, updated: true };
	}

	const normalizeItem = item as {
		name: string;
		color?: unknown;
	};
	const name = normalizeItem.name.trim();

	if (name === "") {
		return { record: null, updated: true };
	}

	const colorFromStorage = getValidHexColor(normalizeItem);

	return {
		record: {
			name,
			color: colorFromStorage ?? generateRandomHexColor(),
		},
		updated: colorFromStorage === null,
	};
};

export const normalizeRecordTags = (rawTags: unknown) => {
	if (!Array.isArray(rawTags)) {
		return {
			tags: [],
			hasUpdated: false,
		};
	}

	const tags: RecordTags = [];
	let hasUpdated = false;

	for (const item of rawTags) {
		const normalizeItem = normalizeTagItem(item);

		if (normalizeItem.updated) {
			hasUpdated = true;
		}

		if (normalizeItem.record === null) {
			continue;
		}

		const hasTag = existTagByName(tags, normalizeItem.record.name);

		if (hasTag) {
			hasUpdated = true;
			continue;
		}

		tags.push(normalizeItem.record);
	}

	return {
		tags,
		hasUpdated,
	};
};

export const addRecordTag = (data: RecordTags, tagName: string): RecordTags => {
	const cleanTag = tagName.trim();

	if (cleanTag === "") {
		return data;
	}

	const hasTag = existTagByName(data, cleanTag);

	if (hasTag) {
		return data;
	}

	return [
		{
			name: cleanTag,
			color: generateRandomHexColor(),
		},
		...data,
	];
};

export const deleteRecordTag = (
	data: RecordTags,
	tagName: string,
): RecordTags => {
	return data.filter((item) => item.name !== tagName);
};
