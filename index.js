const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster0.qeiix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
port = process.env.PORT || 3001;
const ObjectID  = require('mongodb').ObjectID;

app.use(express.json());
app.use(cors());



client.connect(err => {
     console.log("connected");
          const shoe = client.db("ShoeFactory").collection("shoes");

          app.post('/addShoe', (req,res)=>{
               const shoeInfo = req.body
               shoe.insertOne(shoeInfo).then(result=> console.log(result.insertedCount));
          })

          app.get('/shoes',(req,res)=>{
               shoe.find({}).toArray((err,shoes)=>{
                    res.send(shoes);
               })
          })
          app.get('/shoes/:id',(req,res)=>{
               shoe.find({_id: ObjectID(req.params.id)})
               .toArray((err,shoes)=>{
                    res.send(shoes);
               })
          })

          app.delete('/shoes/:id',(req,res)=>{
               shoe.findOneAndDelete({_id: ObjectID(req.params.id)})
          })

          const order = client.db("ShoeFactory").collection("orderInfo");     
          app.post('/orderItem', (req,res)=>{
               const data = req.body;
               order.insertOne(data).then(result=> console.log(result.insertedCount));
          })

          app.get('/orders',(req,res)=>{
               const queryData = req.query
               order.find(queryData)
               .toArray((err,orders)=>{
                    res.json(orders)
               })
          })
     });

app.get('/', (req,res)=>{
     res.send('Server site is working perfectly')
})

app.listen(port);