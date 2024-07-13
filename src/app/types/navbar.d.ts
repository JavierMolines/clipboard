interface IDatagramNavbar {
	img: string;
	title: string;
	link: string;
}

interface IOptionsNavbar {
	top: Array<IDatagramNavbar>;
	bottom: Array<IDatagramNavbar>;
}
