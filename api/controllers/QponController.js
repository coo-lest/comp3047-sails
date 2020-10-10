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
        return res.send("update");
    }

};

