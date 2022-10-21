import { createUserData } from "../data/customer/index.js";

const createUser =  async (req, res) => {
    try {
        const data = req.body;
        const create = await createUserData(data);
        res.status(200).send(create);
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
}

export {createUser}