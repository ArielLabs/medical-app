import { NextFunction, Request, Response, Router } from "express";
import { login, validateAuth } from "../BLL/authBLL";
import { authLoginSchema } from "../validation/auth";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    try {
      const { error } = authLoginSchema.validate(user);
      if (error) {
        throw { code: 400, msg: error.details[0].message };
      }

      const result = await login(user);
      res.cookie("token", result, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out succesfully" });
});

router.get("/validate", (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  const result = validateAuth(token);
  res.status(200).json({ message: result });
});

export default router;
