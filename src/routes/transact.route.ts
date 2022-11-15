import { Router } from "express";
import { deposit } from "../controllers/transaction";

const router = Router();

router.route("/deposit").post(deposit);

export default router;
