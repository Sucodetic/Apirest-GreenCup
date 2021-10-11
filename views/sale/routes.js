import Express from "express";
import { createSale, createUser, deleteSale, deleteUser, editSale, editUser, getAllusers } from "../../controllers/sale/saleController";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasVentas.route("/ventas").get((req, res) => {
  getAllusers(genericCallback(res));
});

rutasVentas.route("/ventas").post((req, res) => {
  createSale(req.body, genericCallback(res));
});

rutasVentas.route("/ventas/:id").patch((req, res) => {
  editSale(req.params.id, req.body, genericCallback(res));
});

rutasVentas.route("/ventas/:id").delete((req, res) => {
  deleteSale(req.params.id, genericCallback(res));
});

export default rutasVentas;
