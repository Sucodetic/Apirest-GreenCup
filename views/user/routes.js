import Express from "express";
import { createUser, deleteUser, editUser, getAllusers, getUserByRol } from "../../controllers/user/userController.js";

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasUsuario.route("/usuarios").get((req, res) => {
  getAllusers(genericCallback(res));
});

rutasUsuario.route("/usuarios/:rol").get((req, res) => {
  getUserByRol(req.params.rol, genericCallback(res));
});

rutasUsuario.route("/usuarios").post((req, res) => {
  createUser(req.body, genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").patch((req, res) => {
  editUser(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").delete((req, res) => {
  deleteUser(req.params.id, genericCallback(res));
});

export default rutasUsuario;
