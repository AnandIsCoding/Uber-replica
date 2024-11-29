import express from "express";
import {
  captainSignupController,
  captainLoginController,
  captainLogoutController,
  captainProfileController
} from "../controllers/captain.controller.js";
import { body } from "express-validator";
import {captainAuthentication} from '../middlewares/captainauth.middleware.js'
const captainRouter = express.Router();

captainRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("fullName.lastName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type, 0nly car auto bike accepted"),
  ],
  captainSignupController
);

captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  captainLoginController
);

captainRouter.delete('/logout', captainLogoutController )
captainRouter.get('/profile',captainAuthentication, captainProfileController)

export default captainRouter;
