import express from "express";

const app = express()

app.use(express.static("public_html", {
	extensions: ['html', 'js'],
}));
app.use("/assets", express.static("assets"));

app.listen(3000, () => {
	console.log("Listening on port 3000");
})