import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connectToMongoDB();
import productsController from "./06-controllers/products-controller";
import categoriesController from "./06-controllers/categories-controller";
import errorsHandler from "./02-middleware/errors-handler";

// Create server
const server = express();

// Add middleware
server.use(cors());
server.use(express.json());
// Controllers
server.use("/api/products", productsController);
server.use("/api/categories", categoriesController);
// Error handler
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));

