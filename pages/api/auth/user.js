import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const access = cookies.access || false; // if access cookie is not present, set access to false

    if (!access) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/me/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.data) {
        res.status(200).json({user: response.data});
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
