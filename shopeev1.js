var exp = require("express");
var router = exp.Router();
const crypto = require("crypto");

router.get("/time_unix", (req, res) => {
    const { date_start, date_end } = req.query;
    //const now = new Date();

    var datestart = new Date(date_start);
    var datesend = new Date(date_end);

    const now = new Date();
    var unix_now = (now.getTime() / 1000) | 0;
    var unix_start = (datestart / 1000) | 0;
    var unix_end = (datesend / 1000) | 0;

    res.send({ unix_now, unix_start, unix_end });
});

router.post("/call", (req, res) => {
    const { app_secret, api_name } = req.headers;
    (async () => {
        const body = req.body;
        const _url = "https://partner.shopeemobile.com" + api_name;
        const base = _url + "|" + JSON.stringify(body);
        const sign_secret = crypto
            .createHmac("sha256", app_secret)
            .update(base)
            .digest("hex");
        const rss_spee = await axios({
            method: "POST",
            url: _url,
            data: body,
            headers: {
                Authorization: sign_secret,
            },
        });
        //console.log(rss_spee);
        res.send(rss_spee.data);
    })().catch((err) => res.send(err.message));
});

module.exports = router;