import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("venta").find().limit(50).toArray(callback);
};

const createSale = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  console.log("llaves: ", Object.keys(datosVenta));
  if (
    Object.keys(datosUsuario).includes("idVenta") &&
    Object.keys(datosUsuario).includes("valorVenta") &&
    Object.keys(datosUsuario).includes("idProducto") &&
    Object.keys(datosUsuario).includes("cantidad") &&
    Object.keys(datosUsuario).includes("precioUnitario") &&
    Object.keys(datosUsuario).includes("fecha") &&
    Object.keys(datosUsuario).includes("nombreCliente") &&
    Object.keys(datosUsuario).includes("documentoCliente") &&
    Object.keys(datosUsuario).includes("vendedor") &&
    Object.keys(datosUsuario).includes("estado")
  ) {
    await baseDeDatos.collection("venta").insertOne(datosVenta, callback);
  } else {
    return { err: "conditions not met", result: "" };
  }
};

const editSale = async (saleId, data, callback) => {
  const filtroVenta = { _id: new ObjectId(saleId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("venta").findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteSale = async (saleId, callback) => {
  const filtroVenta = { _id: new ObjectId(saleId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("sale").deleteOne(filtroVenta, callback);
};

export { getAllSales, createSale, editSale, deleteSale };
