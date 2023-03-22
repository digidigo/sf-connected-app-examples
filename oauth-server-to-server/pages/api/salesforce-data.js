// pages/api/salesforce-data.js

import { connect } from "../../utils/mongodb";
import axios from "axios";

export default async function handler(req, res) {
  // Get user ID from the request
  const { userId } = req.query;

  // Connect to MongoDB and find the user
  const db = await connect();
  const collection = db.collection("users");
  const user = await collection.findOne({ userId: userId });
  const versionNumber = 45;
  // Check if user is found
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  let url = user.restUrl
    .split("/")
    .filter((e) => e !== "")
    .slice(0, -1)
    .join("/");

  console.log(`url: ${url} accessToken: ${user.accessToken}`);
  // Fetch contact data from Salesforce API
  try {
    const response = await axios.get(
      `${url}/v57.0/query?q=SELECT+Id,FirstName,LastName+FROM+Contact`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    res.status(200).json(response.data.records);
  } catch (error) {
    console.error(
      `Error retrieving Contacts: status=${error.response.status} message=${error.response.data}`
    );
    res
      .status(500)
      .json({ error: "Error fetching contact data from Salesforce API" });
  }
}
