const express = require('express');
const app = express();
app.use(express.json())
const Web3 = require('web3');

// Variables definition
const privKey =
'ff10171daee77fd45bd30c665eed74a9f11daeecacc5f4a42eeb7de67c73253e'; // Genesis private key
const addressFrom = '0xD94feD42719DB4E9ac48A587AD25bd14fC19B697';
const web3 = new Web3('https://rpc.ankr.com/eth_sepolia');



app.post('/send-transaction',  async (req, res) => {

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: req.body.address,
         value: web3.utils.toWei(req.body.value, 'ether'),
         gas: '21000',
      },
      privKey
   );

   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   res.send({ hash : createReceipt.transactionHash});
});

app.get('/get-balance', async (req, res) => {
   const balance = await web3.eth.getBalance("0xD94feD42719DB4E9ac48A587AD25bd14fC19B697")
   res.send({ balance : balance});
})

app.post('/check-transaction', async (req, res) => {
   const value = await web3.eth.getTransactionReceipt(req.body.hash);
   res.send({"status": value.status})
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
