import {createPackageData, getPaymentMethod} from '../data/packages/index.js'

const sendPackage = async (req, res) => {
     try {
          const data = req.body
          const tt = await createPackageData(data)
          console.log(tt)
          res.status(200).send({status:'Ok', data: null, message: 'Successful'})
          // console.log(data)
     } catch (error) {
          res.status(400).send(error.message)
     }
}

const allPaymentMethod = async (req, res) => {
     try {
        const result =  await getPaymentMethod()
        
          res.status(200).send({status:"Ok", data: result, message: "Successful"})
     } catch (error) {
          res.status(400).send(error.message)
     }
}

export {sendPackage, allPaymentMethod}