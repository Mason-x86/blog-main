const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const basicRouter = require('./routes/basic');
const path = require('path');
const app = express();
const port = 5000; 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Basicnull:Number46%4017MM3102@cluster0.t1ibm6f.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  try {
    await mongoose.connect("mongodb+srv://Basicnull:Number46%4017MM3102@cluster0.t1ibm6f.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));
    console.log("success")
  } catch (e) {
    console.log(e)
  } 
}

run().catch(console.dir);




app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }))




app.get('/', (req, res) =>  {
  res.render('articles/index')
})


app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/articles', articleRouter);
app.use('/basic', basicRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
