import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/token/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.access) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 15,
            sameSite: "Lax",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
        });

      } else {
        res.status(response.status).json({
          error: "Authentication failed",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Authentication failed." });
    }
  }
};
