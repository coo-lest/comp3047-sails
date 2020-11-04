module.exports = async function (req, res, proceed) {

    if (req.session.usertype == "admin") {
        return proceed();
    }

    return res.forbidden();
}