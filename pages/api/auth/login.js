import axios from "axios";
import { cookies } from "next/dist/client/components/headers";

export default async (req, res) => {
  console.log(req);

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
      }

      const res = await axios.post(
        `${process.env.API_URL}/api/auth/login`,
        { username: email, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.ok) {
        res.setHeader( "Set-Cookie", [
            cookies.serialize("access", res.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/",
            }),
        ]);

      }
      return res.status(400).json({ error: data.message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
