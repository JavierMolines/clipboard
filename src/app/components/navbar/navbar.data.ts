interface IDatagramNavbar {
	img: string;
	title: string;
	link: string;
}

export const datagram: Array<IDatagramNavbar> = [
	{
		img: "document",
		title: "List clipboard",
		link: "/",
	},
	{
		img: "create",
		title: "Create clipboard",
		link: "/create",
	},
];
