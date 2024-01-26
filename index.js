require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const homeRoute = require("./routes/homeRoute");
const discoverRoute = require("./routes/discoverRoute");
const genresRoute = require("./routes/genresRoute");
const artistsRoute = require("./routes/artistsRoute");
const artistRecordRoute = require("./routes/artistRecordRoute");
const allcollectionRoute = require("./routes/allcollectionRoute");
const collectionRoute = require("./routes/collectionRoute");
const recordRoute = require("./routes/recordRoute");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const addcollectionRoute = require("./routes/addcollectionRoute");
const libraryRoute = require("./routes/libraryRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const addnewcollectionRoute = require("./routes/addnewcollectionRoute");
const settingRoute = require("./routes/settingRoute");
const editcollnameRoute = require("./routes/editcollnameRoute");
const editrecordRoute = require("./routes/editrecordRoute");
const myprofileRoute = require("./routes/myprofileRoute");

app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/", discoverRoute);
app.use("/", genresRoute);
app.use("/", artistsRoute);
app.use("/", artistRecordRoute);
app.use("/", allcollectionRoute);
app.use("/", collectionRoute);
app.use("/", recordRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", addcollectionRoute);
app.use("/", libraryRoute);
app.use("/", dashboardRoute);
app.use("/", addnewcollectionRoute);
app.use("/", settingRoute);
app.use("/", editcollnameRoute);
app.use("/", editrecordRoute);
app.use("/", myprofileRoute);

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});
