const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transactionRouter = require('./routes/transactions');

app.use('/transactions',transactionRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})
