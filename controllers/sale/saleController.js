import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("venta").find().limit(50).toArray(callback);
};

const createSale = async (datosVenta, callback) => {
  const baseDeDatos = getDB();
  console.log("llaves: ", Object.keys(datosVenta));
  if (
    Object.keys(datosVenta).includes("idVenta") &&
    Object.keys(datosVenta).includes("valorVenta") &&
    Object.keys(datosVenta).includes("idProducto") &&
    Object.keys(datosVenta).includes("cantidad") &&
    Object.keys(datosVenta).includes("precioUnitario") &&
    Object.keys(datosVenta).includes("fecha") &&
    Object.keys(datosVenta).includes("nombreCliente") &&
    Object.keys(datosVenta).includes("documentoCliente") &&
    Object.keys(datosVenta).includes("vendedor") &&
    Object.keys(datosVenta).includes("estado")
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
