import { connect } from "../../utils/mongodb";

export default async function handler(req, res) {
  try {
    const db = await connect();
    const testCollection = db.collection("test");
    await testCollection.insertOne({ test: "MongoDB connection successful!" });
    const testDoc = await testCollection.findOne({
      test: "MongoDB connection successful!",
    });

    res
      .status(200)
      .json({ message: "MongoDB connection test passed!", testDoc });
  } catch (error) {
    res.status(500).json({
      message: "MongoDB connection test failed." + error.message,
      error: error.message,
    });
  }
}
