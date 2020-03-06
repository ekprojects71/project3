//set up our app and import express package
const express = require("express");
const app = express();

app.use(express.static("public"));

//default port = 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));