const makeId = () => {
	const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let keyGen = "";
	for (let i = 0; i < 20; i++) {
		const indexRandom = Math.floor(Math.random() * validCharacters.length);
		keyGen += validCharacters.charAt(indexRandom);
	}
	return keyGen;
};

export { makeId };
