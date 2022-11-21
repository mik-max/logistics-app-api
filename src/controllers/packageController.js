import {createPackageData} from '../data/packages/index.js'

const sendPackage = async (req, res) => {
     try {
          const data = req.body
          await createPackageData(data)
          res.status(200).send({status:'Ok', data: null, message: 'Successful'})
          // console.log(data)
     } catch (error) {
          res.status(400).send(error.message)
     }
}

export {sendPackage}