import { CaseController } from "./controller";
import { Router } from "express";

export class CaseRoutes {
    static get routes() {
        const router = Router();
        const controller = new CaseController();
        router.get("/", controller.getAll);
        router.post("/", controller.createCase);
        router.get("/last", controller.getLatestCases);
        router.get("/:id", controller.getCaseById);
        router.put("/:id", controller.updateCase);
        router.delete("/:id", controller.deleteCase);
        return router;
    }
}