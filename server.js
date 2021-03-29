const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');

app.use(express.json())
app.use("/", routes);
app.listen(8080, (err) => {
    console.log(`API listening!`);
})
