declare interface IDatagramNavbar {
	img: ValidIcons;
	title: string;
	link: string;
}

declare interface IOptionsNavbar {
	top: Array<IDatagramNavbar>;
	bottom: Array<IDatagramNavbar>;
}
