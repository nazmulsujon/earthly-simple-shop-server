const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("earthly simple shop server is running!"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pdzsrjb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsCollection = client.db("EarthlySimpleShop").collection("products");

    // all products API (get all product)
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productsCollection.find(query).toArray();
      res.send(products);
    });

    // product API (get product by id)
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;

      const query = { id: id };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => console.log(`earthly-simple-shop app listening on port ${port}`));
