import { createDriverData, updateDriverData } from "../data/drivers/index.js";



const createDriver = async (req, res) => {
  try {
    const data = req.body;
    const create = await createDriverData(data);
    res.status(200).send(create);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
};

const updateDriver = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id
        const update = await updateDriverData(id, data);
        res.status(200).send(update);
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
}


export {updateDriver, createDriver}