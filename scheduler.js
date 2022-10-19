import schedule from 'node-schedule'
import fetch from 'node-fetch';



schedule.scheduleJob('*/1 * * * *', async function() {
     // This will run every minute
     // fetch('http://localhost:8005/api/v1/otps/expire').then(response => {return response.json()}).then(data => {
     //      console.log(data)
     // })
     console.log('hey!')
 });