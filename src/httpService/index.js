const express = require("express");
const helmet = require("helmet");
const app = express();
const API_V1 = "/api/v1/";

app.use(express.json());
app.use(helmet());

app.use(`${API_V1}identify`, require("../routers/identifyRouter"));
app.use(`${API_V1}products`, require("../routers/productsRouter"));
app.use(`${API_V1}purchases`, require("../routers/purchasesRouter"));
app.use(`${API_V1}coupons`, require("../routers/couponsRouter"));
app.use(`${API_V1}payments`, require("../routers/paymentRouter"));
app.use(`${API_V1}billing`, require("../routers/billingRouter"));

module.exports = app;
