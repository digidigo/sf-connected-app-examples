import { connect } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: "userId is required." });
    return;
  }

  try {
    const { db } = await connect();
    const collection = db.collection("users");
    const user = await collection.findOne({ userId });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res
      .status(200)
      .json({ accessToken: user.accessToken, refreshToken: user.refreshToken });
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    res.status(500).json({ error: "Error fetching user tokens." });
  }
}
