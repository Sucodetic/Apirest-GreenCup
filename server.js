import dotenv from "dotenv";
import Express from "express";
import morgan from "morgan";
import Cors from "cors";
import { connectServer } from "./db/db.js";
import rutasProducto from "./views/product/routes.js";
//mport rutasUsuario from "./views/user/routes.js";
//import rutasVenta from "./views/sale/routes.js";

dotenv.config({ path: "./.env" });

const app = Express();

app.use(morgan("dev"));
app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
//app.use(rutasUsuario);
//app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

connectServer(main);
