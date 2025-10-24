const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const metrics = require("../utils/metrics");
const userServices = require("./user.services");
const _ = require("lodash");

const prisma = new PrismaClient();

// Authenticate user by email and password
async function authUser(email, password) {
    const labels = { operation: "Auth User" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        timer({ ...labels, success: "true" });
        // actual authentication logic here
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

// Sign up a new user
async function signup(data) {
    const labels = { operation: "Signup User" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const createdUser = await userServices.createUser({ ...data, password: hashedPassword });

        if (!createdUser) {
            return response.reponsesFail(400, "Create User Failed.");
        }

        const token = generateAuthToken(createdUser);
        timer({ ...labels, success: "true" });
        return { body: token };
    } catch (error) {
        timer({ ...labels, success: "false" });
        return response.reponsesFail(500, error.message);
    }
}

// Log in an existing user
async function login(email, password) {
    try {
        const user = await userServices.getUserByEmail(email);
        if (!user) return response.reponsesFail(400, "Invalid email or password.");

        const validPassword = await validatePassword(user, password);
        if (!validPassword) return response.reponsesFail(400, "Invalid email or password.");

        const token = generateAuthToken(user);
        return { body: { token, userId: user.id, role: user.role } };
    } catch (error) {
        return response.reponsesFail(500, "Unexpected error occurred in login.");
    }
}

// Generate JWT token for a user
function generateAuthToken(user) {
    const JWT_KEY = process.env.JWTPRIVATEKEY;
    if (!JWT_KEY) throw new Error("Missing JWTPRIVATEKEY in environment.");

    const payload = _.pick(user, ["id", "email", "role", "name"]);
    return jwt.sign(payload, JWT_KEY);
}

// Validate a user's password
async function validatePassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

// Export functions
module.exports = {
    authUser,
    signup,
    login,
    generateAuthToken,
    validatePassword,
};
