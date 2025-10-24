const { Prisma } = require("@prisma/client");
const userServices = require("../service/user.services");

async function createUserHandler(req, res) {
    try {
        const user = await userServices.createUser(req.body);
        return res.send(user);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                console.log("Unique constraint violation: cannot create a user with this email.");
                return res.sendStatus(500);
            }
        } else {
            return res.sendStatus(500);
        }
    }
}

module.exports = { createUserHandler };

// Example handlers for reference (commented out):
/*
async function getUserHandler(req, res) {
    const user = await getUser(req.params);
    if (!user) return res.sendStatus(404);
    return res.send(user);
}

async function updateUserHandler(req, res) {
    const update = req.body;
    const user = await getUser(req.params);
    if (!user) return res.sendStatus(404);
    const updatedUser = await updateUser(req.params, update);
    return res.send(updatedUser);
}

async function deleteUserHandler(req, res) {
    const user = await getUser(req.params);
    if (!user) return res.sendStatus(404);
    const deletedUser = await deleteUser(req.params);
    return res.send(deletedUser);
}
*/
