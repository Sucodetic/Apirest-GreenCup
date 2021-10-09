import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllProducts = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("producto").find().limit(50).toArray(callback);
};

const createProduct = async (datosProducto, callback) => {
  const baseDeDatos = getDB();
  console.log("llaves: ", Object.keys(datosProducto));
  if (
    Object.keys(datosProducto).includes("idProducto") &&
    Object.keys(datosProducto).includes("descripcion") &&
    Object.keys(datosProducto).includes("valorUnitario") &&
    Object.keys(datosProducto).includes("estado")
  ) {
    await baseDeDatos.collection("producto").insertOne(datosProducto, callback);
  } else {
    return { err: "conditions not met", result: "" };
  }
};

const editProduct = async (productId, data, callback) => {
  const filtroProducto = { _id: new ObjectId(productId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("producto").findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteProduct = async (productId, callback) => {
  const filtroProducto = { _id: new ObjectId(productId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("producto").deleteOne(filtroProducto, callback);
};

export { getAllProducts, createProduct, editProduct, deleteProduct };
