module.exports = async function (req, res, proceed) {

    if (req.session.uid) {
        return proceed();
    }

    return res.forbidden();
}
