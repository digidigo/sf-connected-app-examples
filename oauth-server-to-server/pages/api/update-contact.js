import JSforceUtils from "../../utils/jsforceUtils";
import { connect } from "../../utils/mongodb";

export default async function handler(req, res) {
  console.log(req);
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  try {
    // Retrieve the userId value from the cookie
    const userId = req.cookies.userId;

    // Connect to MongoDB and find the user
    const db = await connect();
    const collection = db.collection("users");
    const user = await collection.findOne({ userId: userId });

    const { id } = req.query;
    const updates = req.body;
    updates.Id = id;
    const { accessToken, instanceUrl } = user;

    const jsforceUtils = new JSforceUtils(accessToken, instanceUrl);

    const result = await jsforceUtils.updateContact(updates);

    res.status(200).json(updates);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
