import { Router } from "express";
const router = Router();

router.get("/users");
router.get("/users/:id");
router.post("/users");
router.put("/users");
router.delete("/users/:id");

export default router;
