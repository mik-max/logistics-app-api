export const calculateFee = (total, subtotal) => {
     let fee = total - subtotal;
     return fee;
}

export const calculateFinalCharge = (amount) => {
     let finalCharge = (amount * 10000)/9741.68;
     let result = parseFloat(finalCharge.toFixed(2))
     return result;
}