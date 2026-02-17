const baseHues = [
	0, // rojo
	15, // rojo anaranjado
	30, // naranja oscuro
	45, // ámbar
	60, // amarillo oscuro
	75, // oliva
	90, // verde oliva
	120, // verde
	140, // verde esmeralda
	160, // verde azulado
	180, // teal
	200, // azul profundo
	220, // azul marino
	240, // azul intenso
	260, // índigo
	280, // morado
	300, // magenta oscuro
	320, // fucsia oscuro
	340, // carmesí
	25, // marrón rojizo
	35, // marrón cálido
	50, // mostaza
	210, // azul acero
	170, // turquesa oscuro
];

const hslToHex = (h: number, s: number, l: number) => {
	s /= 100;
	l /= 100;

	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) =>
		Math.round(
			255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))),
		)
			.toString(16)
			.padStart(2, "0");

	return `#${f(0)}${f(8)}${f(4)}`;
};

export const getValidHexColor = (item: { color?: unknown }) => {
	const defaultColor = "#000000";
	const checkHexColor = (color: string) => {
		return /^#[0-9A-Fa-f]{6}$/.test(color);
	};

	if (typeof item.color !== "string") {
		return null;
	}

	return checkHexColor(item.color) ? item.color : defaultColor;
};

export const generateRandomHexColor = () => {
	const hue = baseHues[Math.floor(Math.random() * baseHues.length)];

	const saturation = Math.floor(Math.random() * 40) + 55; // 55–95%
	const lightness = Math.floor(Math.random() * 12) + 18; // 18–30%

	return hslToHex(hue, saturation, lightness);
};
