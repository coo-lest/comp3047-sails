/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('qpon/create');

        var qpon = await Qpon.create(req.body).fetch();

        return res.redirect("/");
    },

    // action - delete
    delete: async function (req, res) {
        var deletedQpon = await Qpon.destroyOne(req.params.id)

        if (!deletedQpon) return res.notFound();

        return res.redirect("/qpon/admin")
    },

    // action - admin
    admin: async function (req, res) {

        var all = await Qpon.find();

        return res.view('qpon/admin', { qpons: all });
    },

    // action - update
    update: async function (req, res) {
        if (req.method == "GET") {
            var thatQpon = await Qpon.findOne(req.params.id);

            if (!thatQpon) return res.notFound();

            return res.view('qpon/update', { qpon: thatQpon });
        } else {
            // POST
            var updatedQpon = await Qpon.updateOne(req.params.id).set(req.body);

            if (!updatedQpon) return res.notFound();

            return res.redirect("/qpon/admin");
        }
    },

    // action - detail
    detail: async function (req, res) {
        var displayQpon = await Qpon.findOne(req.params.id).populate("owners");

        if (!displayQpon) return res.notFound();

        res.view("qpon/detail", { qpon: displayQpon });
    },

    // action - home
    home: async function (req, res) {
        if (req.wantsJSON) {
            var json = await Qpon.find();
            console.log(json);
            console.log("HOME");
            return res.json(json);
        }
        var hkQpons = await Qpon.find({ where: { region: "HK" }, sort: "createdAt DESC" });
        var klQpons = await Qpon.find({ where: { region: "KL" }, sort: "createdAt DESC" });
        var ntQpons = await Qpon.find({ where: { region: "NT" }, sort: "createdAt DESC" });

        res.view("qpon/homepage", { hkQpons: hkQpons.slice(0, 2), klQpons: klQpons.slice(0, 2), ntQpons: ntQpons.slice(0, 2) });
    },

    // action - search
    search: async function (req, res) {
        if (req.method == "POST") {
            console.log(req.body);
            var whereClause = {};
            if (req.body.region) whereClause.region = req.body.region;
            var coinsRange = {};
            if (req.body.minCoins) coinsRange[">="] = req.body.minCoins;
            if (req.body.maxCoins) coinsRange["<="] = req.body.maxCoins;
            if (Object.keys(coinsRange).length != 0) whereClause.coins = coinsRange;
            if (req.body.validOn) whereClause.expire = { ">=": req.body.validOn };

            var thoseQpons = await Qpon.find({
                where: whereClause,
            });

            var count = thoseQpons.length;

            thoseQpons = await Qpon.find({
                where: whereClause,
                limit: req.body.limit,
                skip: req.body.offset
            });

            console.log("count: " + count);

            return res.json({ qpons: thoseQpons, numOfRecords: count });
        }
        res.view("qpon/search");
    },

    redeem: async function (req, res) {

        if (!await Qpon.findOne(req.params.id)) return res.status(404).json('Qpon not found');

        var thatUser = await User.findOne(req.session.uid).populate("coupons", { id: req.params.id });

        var thatQpon = await Qpon.findOne(req.params.id);

        if (!thatUser) return res.status(404).json("User not found");

        if (thatQpon.quota <= 0) return res.status(498).json("Qpon sold out");

        if (thatUser.coins < thatQpon.coins) return res.status(499).json("No enough coins");

        if (thatUser.coupons.length != 0) return res.status(409).json("Already redeemed");

        // deduct qpon quota
        thatQpon.quota--;
        await Qpon.updateOne(req.params.id).set({ quota: thatQpon.quota });
        // deduct user coins
        thatUser.coins -= thatQpon.coins;
        await User.updateOne(req.session.uid).set({ coins: thatUser.coins });

        await Qpon.addToCollection(req.params.id, "owners").members(req.session.uid);

        return res.ok();
    },

    // list coupons of a user
    list: async function (req, res) {

        var thatUser = await User.findOne(req.session.uid).populate("coupons");

        if (!thatUser) return res.status(404).json("User not found");

        return res.view("qpon/redeemed", { qpons: thatUser.coupons, coins: thatUser.coins });
    },

    owners: async function (req, res) {

        var thatQpon = await Qpon.findOne(req.params.qid).populate("owners");

        if (!thatQpon) return res.status(404).json("Coupon not found");

        return res.view("qpon/owners", { qpon: thatQpon });
    },
};

