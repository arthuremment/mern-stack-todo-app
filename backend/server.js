const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();
const Schema = mongoose.Schema;
const router = express.Router();

app.use(cors())
app.use(bodyParser.json())
app.listen(4000, () => {
    console.log('server is up and running on port 4000')
})


const db = "mongodb+srv://artshiv13:RgufaziHN09nFQoS@todo-app.82zlwed.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db)
    .then(() => console.log('successfully connected to db'))
    .catch(err => console.log(err))

// Connexion without mongoose
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://artshiv13:RgufaziHN09nFQoS@todo-app.82zlwed.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


//Schema
let todoSchema = new Schema({
    text: String,
    isCompleted: Boolean
})

let Todo = mongoose.model('Todo', todoSchema)

//Routes
app.use('/todos', router)

//read
router.route('/').get(function (_, res) {
    Todo.find()
        .then(function (items) {
            res.status(200).send(items);
            console.log(items);
        })
        .catch(function (err) {
            res.send(400).send(`ERROR ${err}`);
            console.log(err);
        })
})

//create
router.route('/add').post(function (req, res) {
    let todo = new Todo(req.body)

    todo.save()
        .then(() => {
            res.status(200).send({ message: `${todo.text} is successfully added` })
            console.log('todo successfully created')
            
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ error: `error adding document ${err}` })
        })
})

//update
router.route('/:id').put(function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
            todo.isCompleted = !todo.isCompleted;
            todo.save();
            console.log('successfully updated')
            res.status(200).send({ message: `${todo.text} is successfully updated` })
        })
        .catch((err) => {
            res.status(400).send({ error: `error updating document ${err}` })
        })

})

//delete
router.route('/:id').delete(function (req, res) {

    Todo.findByIdAndDelete(req.params.id)
        .then(function () {
            console.log('todo deleted succesfully')
            res.status(200).send({ message: 'todo deleted succesfully' })
        })
        .catch(function (err) {
            res.status(400).send({ error: `error deleting document ${err}` })
        })
})
