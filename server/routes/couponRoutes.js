import express from "express";
import {
  getAll,
  addCoupon,
  getById,
  delOne,
  claimed,
  deleteAll,
} from "../controller/couponsController.js";
const couponRoutes = express.Router();

couponRoutes.post("/add", addCoupon);                           // To add a new document to the collection
couponRoutes.get("/get", getAll);                               // To fetch all the documents in the collection
couponRoutes.get("/get/:couponId", getById);                    // To fetch the specific document by ID in the collection
couponRoutes.delete("/remove/:couponId", delOne);               // To delete a specific document by ID
couponRoutes.patch("/claim/:couponId", claimed);                // To Update a specific document by ID
couponRoutes.delete("/deleteall", deleteAll);                   // To drop entire collections.. FOR TESTING ONLY

export default couponRoutes;
