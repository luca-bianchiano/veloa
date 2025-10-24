const lodash = require("lodash");
const { login, signup } = require("../service/auth.services");
const { responseHandler } = require("../utils/response");

async function loginHandler(req, res) {
    const { email, password } = req.body;
    const result = await login(email, password);

    console.log("login result:", result);

    if (result.error) {
        return res.status(result.error.status).send(result.error.message);
    }

    if (result.body) {
        // Store simple session key; you could store full user info if needed
        req.session.key = email;

        console.log("session:", req.session);
        console.log("cookies:", res.cookie);

        return res.status(200).send(result.body.token);
    }
}

async function signupHandler(req, res) {
    const data = lodash.pick(req.body, ["name", "email", "password"]);
    const result = await signup(data);
    responseHandler(result, res);
}

module.exports = {
    loginHandler,
    signupHandler
};
