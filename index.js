const app = require("./config/app");
const apiRoutes = require("./routes");

app.use("/api/", apiRoutes);

app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));
