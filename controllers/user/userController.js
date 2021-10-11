import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllusers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuario").find().limit(50).toArray(callback);
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
  if (
    Object.keys(datosUsuario).includes("nombre") &&
    Object.keys(datosUsuario).includes("correo") &&
    Object.keys(datosUsuario).includes("estado") &&
    Object.keys(datosUsuario).includes("rol")
  ) {
    await baseDeDatos.collection("usuario").insertOne(datosUsuario, callback);
  } else {
    return { err: "conditions not met", result: "" };
  }
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

export { getAllusers, createUser, editUser, deleteUser, getUserByRol };
