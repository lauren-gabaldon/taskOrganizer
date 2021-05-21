const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

require("./routes/htmlRoutes")(app);

require("./routes/apiRoutes")(app);

app.listen(PORT, () => {
  console.log(`app listening to localhost: ${PORT}`);
});
