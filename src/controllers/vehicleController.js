import { createVehicleData, updateVehicleData,approveVehicleData, rejectVehicleData } from "../data/vehicles/index.js";
import { sendVehicleApproved, sendVehicleRejected } from "../Services/EmailService.js";


const createVehicle = async (req, res) => {
    try {
        let data = req.body;
        const create = await createVehicleData(data);
        res.status(200).send(create)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateVehicle = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const update = await updateVehicleData(id, data)
        console.log(update);
        res.status(201).send(update)

    } catch (error) {
         res.status(400).send(error.message);
    }
}
const approveVehicle = async (req, res, next) => {
    try {
        const id = req.params.id
        const approve = await approveVehicleData(id);
        await sendVehicleApproved('michaelchinye2018@gmail.com')
        res.status(201).send(approve);

    } catch (error) {
         res.status(400).send(error.message);
    }
}
const rejectVehicle = async (req, res, next) => {
    try {
        const id = req.params.id
        const reject = await rejectVehicleData(id);
        await sendVehicleRejected('emekachinye09@gmail.com')
        res.status(201).send(reject);

    } catch (error) {
         res.status(400).send(error.message);
    }
}


export { createVehicle, updateVehicle, approveVehicle, rejectVehicle };