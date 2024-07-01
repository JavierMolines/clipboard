interface IDatagramNavbar {
	img: string;
	title: string;
	link: string;
}

export const datagram: Array<IDatagramNavbar> = [
	{
		img: "create",
		title: "Create clipboard",
		link: "/create",
	},
	{
		img: "document",
		title: "List clipboard",
		link: "/",
	},
];
