
import express from "express";
import {
  listUsers,
  showUser,
  storeUser,
  editUser,
  destroyUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", showUser);
router.post("/", storeUser);
router.patch("/:id", editUser);
router.delete("/:id", destroyUser);

export default router;
