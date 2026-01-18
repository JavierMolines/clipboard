const fs = require("node:fs");
const path = require("node:path");

const dir = path.join(__dirname, "dist", "clipboard", "browser");
const oldFile = path.join(dir, "index.csr.html");
const newFile = path.join(dir, "index.html");

if (fs.existsSync(oldFile)) {
	fs.renameSync(oldFile, newFile);
	console.log("✔ index.csr.html renombrado a index.html");
} else {
	console.log("✖ No se encontró index.csr.html en", dir);
}
