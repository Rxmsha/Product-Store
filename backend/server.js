import express from 'express';      // add type:module to package.json to use imports
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';   // import the function from db.js
import productRoutes from './routes/product.route.js';

dotenv.config();       // need this to be able to read the .env file
const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();  // __dirname is not available in ES6 modules, so we need to define it

// middleware; function that runs before you send a response to the client
app.use(express.json());        // allows us to accept JSON data in the req.body below

app.use("/api/products", productRoutes)

// add dev, build, start under scripts in package.json
if(process.env.NODE_ENV === 'production') {        // production means we deploy this application so we need to have some kind of different configuration
  // dirname tel ls it to go to root folder, and then we join to 'frontend/dist' 
  app.use(express.static(path.join(__dirname, '/frontend/dist')));   // make the dist folder to be our static assets
  app.get('*', (req, res) => {           // this is what we will return anything we visit other than /api/products route
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));  // send the index.html file
  });
}

app.listen(PORT, () => {
  connectDB();                  // connect to the database
  console.log('Server started at http://localhost:' + PORT);
});


