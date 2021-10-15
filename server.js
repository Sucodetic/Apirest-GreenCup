import dotenv from "dotenv";
import Express from "express";
import morgan from "morgan";
import Cors from "cors";
import { connectServer } from "./db/db.js";
import rutasProducto from "./views/product/routes.js";
import rutasUsuario from "./views/user/routes.js";
import rutasVenta from "./views/sale/routes.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

dotenv.config({ path: "./.env" });

const app = Express();

app.set("json spaces", 2);

app.use(morgan("dev"));
app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://greencup.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "api-autenticacion-greencup",
  issuer: "https://greencup.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

connectServer(main);
