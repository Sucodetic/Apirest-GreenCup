import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";

const getAllusers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuario").find().limit(50).toArray(callback);
};

const consultarOCrearUsuario = async (req, callback) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  const user = jwt_decode(token)["http://localhost/userData"];

  const baseDeDatos = getDB();
  baseDeDatos.collection("usuario").findOne({ email: user.email }, async (error, response) => {
    if (response) {
      callback(error, response);
    } else {
      user.auth0ID = user._id;
      delete user._id;
      user.estado = "Pendiente";
      user.rol = "Vendedor";
      await createUser(user, (error, response) => callback(error, user));
    }
  });
};

const getUserByRol = async (rol, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuario")
    .find({
      rol: rol,
    })
    .limit(10)
    .toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  console.log("llaves: ", Object.keys(datosUsuario));
  await baseDeDatos.collection("usuario").insertOne(datosUsuario, callback);
};

const editUser = async (userId, data, callback) => {
  const filtroUsuario = { _id: new ObjectId(userId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuario").findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteUser = async (userId, callback) => {
  const filtroUsuario = { _id: new ObjectId(userId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuario").deleteOne(filtroUsuario, callback);
};

export { getAllusers, createUser, consultarOCrearUsuario, editUser, deleteUser, getUserByRol };
