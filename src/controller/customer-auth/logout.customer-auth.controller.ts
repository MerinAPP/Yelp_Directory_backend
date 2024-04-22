import { Request, Response } from "express";

//@desc logut
//@method GET  /customer-auth/logout
//@access public
export const logout = async (req: Request, res: Response) => {
    const Jwt = req.cookies?.Jwt;
    if (!Jwt) return res.status(204).json({ message: "wasnt there", success: true });
    res.cookie("Jwt", "");
    res.json({ data: "Cookie cleared", success: true });
};
