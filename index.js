
var epress = require("express")
var app = epress();

app.use(epress.json());
app.use(epress.urlencoded({ extended: false }));

app.listen(7777);

app.get("/", (req, res) => {
  res.send({ status: "ShopeeApi v1.0..." });
});

app.use("/shopee/v1/", require("./shopeev1.js"));
