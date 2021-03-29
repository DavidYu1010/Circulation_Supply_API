const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');

app.use(express.json())
app.use("/", routes);
const server = app.listen(process.env.PORT||8080, (err) => {
    console.log(`API listening! ${server.address().port}`);
})
