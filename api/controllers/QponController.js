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

        return res.status(201).json({ id: qpon.id });
    },

    // action - delete
    delete: async function (req, res) {
        var deletedQpon = await Qpon.destroyOne(req.params.id)

        if (!deletedQpon) return res.notFound();

        return res.ok();
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

            return res.ok();
        }
    },

    // action - delete
    delete: async function (req, res) {
        var deletedQpon = await Qpon.destroyOne(req.params.id);

        if (!deletedQpon) return res.notFound();

        return res.ok();
    },

    // action - detail
    detail: async function (req, res) {
        var displayQpon = await Qpon.findOne(req.params.id);

        if (!displayQpon) return res.notFound();

        res.view("qpon/detail", { qpon: displayQpon });
    },

    // action - home
    home: async function (req, res) {
        var hkQpons = await Qpon.find({ where: { region: "HK" }, sort: "createdAt DESC" });
        var klQpons = await Qpon.find({ where: { region: "KL" }, sort: "createdAt DESC" });
        var ntQpons = await Qpon.find({ where: { region: "NT" }, sort: "createdAt DESC" });

        res.view("qpon/homepage", { hkQpons: hkQpons.slice(0, 2), klQpons: klQpons.slice(0, 2), ntQpons: ntQpons.slice(0, 2) });
    },

    // action - search
    search: async function (req, res) {
        var whereClause = {};
        if (req.query.region) whereClause.region = req.query.region;
        if (req.query.minCoin) whereClause.minCoin = req.query.minCoin;
        if (req.query.maxCoin) whereClause.maxCoin = req.query.maxCoin;
        if (req.query.validOn) whereClause.validOn = req.query.validOn;

        var limit = Math.max(req.query.limit, 2) || 2;
        var offset = Math.max(req.query.offset, 0) || 0;

        var thoseQpons = await Qpon.find({
            where: whereClause,
            limit: limit,
            skip: offset
        });

        var allResults = await Qpon.find({ where: whereClause });
        var count = allResults.length;
        res.view("qpon/search", { qpons: thoseQpons, numOfRecords: count, where: whereClause });
    }
};

