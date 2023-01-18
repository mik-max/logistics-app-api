import { createVehicleData, updateVehicleData,approveVehicleData, rejectVehicleData } from "../data/vehicles/index.js";
import { sendVehicleApproved, sendVehicleRejected } from "../Services/EmailService.js";


const createVehicle = async (req, res) => {
    try {
        let data = req.body;
        const create = await createVehicleData(data);
        res.status(200).send({status:'Ok', data:null, message: "successfully enlisted vehicle"})

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
        res.status(201).send({status:'Ok', data:null, message: "successfully updated vehicle"})

    } catch (error) {
         res.status(400).send(error.message);
    }
}
const approveVehicle = async (req, res, next) => {
    try {
        const id = req.params.id
        const approve = await approveVehicleData(id);
        await sendVehicleApproved(req.body.email)
        res.status(201).send({status:'Ok', data:null, message: "successfully approved vehicle"});

    } catch (error) {
         res.status(400).send(error.message);
    }
}
const rejectVehicle = async (req, res, next) => {
    try {
        const id = req.params.id
        const reject = await rejectVehicleData(id);
        await sendVehicleRejected(req.body.email)
        res.status(201).send({status:'Ok', data:null, message: "successfully rejected vehicle"});

    } catch (error) {
         res.status(400).send(error.message);
    }
}


export { createVehicle, updateVehicle, approveVehicle, rejectVehicle };