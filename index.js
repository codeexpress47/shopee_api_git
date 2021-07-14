//echo "# hello" >> README.md
//git init
// git remote add origin https://github.com/codeexpress47/shopee_api_git.git
// git branch -M main
// git push -u origin main
// ============================
//git add --all
//git commit -am 'v1.2'
//git push origin master
//git push -u origin main

var epress = require("express")
var app = epress();

app.use(epress.json());
app.use(epress.urlencoded({ extended: false }));

app.listen(7777);

app.get("/", (req, res) => {
  res.send({ status: "ShopeeApi v1.0..." });
});

app.use("/shopee/v1/", require("./shopeev1.js"));

