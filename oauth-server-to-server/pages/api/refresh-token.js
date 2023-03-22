import jsforce from "jsforce";
import { connect } from "../../utils/mongodb";

async function refreshToken(userId) {
  // Connect to MongoDB and retrieve the user's refresh token
  const db = await connect();
  const collection = db.collection("users");
  const user = await collection.findOne({ userId });

  // Create a new instance of jsforce
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_CALLBACK_URL,
    },
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    instanceUrl: user.saleforceUrl,
  });

  // Refresh the access token
  const accessToken = await conn.oauth2.refreshToken(user.refreshToken);

  // Update the user's access token and refresh token in MongoDB
  await collection.updateOne(
    { userId },
    {
      $set: {
        accessToken: accessToken.access_token,
      },
    }
  );

  return accessToken;
}

export default async function handler(req, res) {
  try {
    const userId = req.query.userId;
    const accessToken = await refreshToken(userId);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
