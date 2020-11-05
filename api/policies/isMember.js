module.exports = async function (req, res, proceed) {

    if (req.session.usertype == "member") {
        return proceed();
    }

    return res.forbidden();
}
