const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = 3000;
const API_V1 = "/api/v1/";
app.listen(PORT, () => {
  console.log(
    "     __  __           _     _ _                _____" +
      "  |  /  |         (_)   | (_)              / ____|" +
      "  |   / | ___ _ __ _  __| |_  __ _ _ __   | |  __ _ __ ___  _   _ _ __  " +
      "  | |/| |/ _  '__| |/ _` | |/ _` | '_   | | |_ | '__/ _ | | | | '_  " +
      "  | |  | |  __/ |  | | (_| | | (_| | | | | | |__| | | | (_) | |_| | |_) |" +
      "  |_|  |_|___|_|  |_|__,_|_|__,_|_| |_|  _____|_|  ___/ __,_| .__/ " +
      "| |" +
      "|_|"
  );

  console.log("port", PORT);
});

app.use(helmet());
app.use(`${API_V1}identify`, require("./routers/identifyRouter"));
app.use(`${API_V1}products`, require("./routers/productsRouter"));
