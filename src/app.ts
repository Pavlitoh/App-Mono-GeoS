import express from "express";
import "dotenv/config";
import { envs as env } from "./config/env.plugin";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/controllers/routes";
import { emailJob } from "./domain/jobs/email.job";

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    await MongoDatabase.connect({
        mongoUrl: env.MONGO_URL,
        dbName: "Mono-app"
    });
})();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
    emailJob();
});