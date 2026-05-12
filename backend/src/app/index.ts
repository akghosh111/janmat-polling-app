import express from "express";
import { authRouter } from "./auth/routes";
import { authMiddleware, AuthenticatedRequest } from "./middlewares/auth";


export function createApplication() {
    const app = express()


    app.use(express.json())


    app.get("/", (req, res) => {
        return res.json({message: "Backend of Janmat"})
    });

    app.use("/api/auth", authRouter)

    app.get("/api/me", authMiddleware, (req: AuthenticatedRequest, res) => {
        return res.json({
            message: "Authentication successful",
            user: req.user
        })
    })

    


    return app;
}