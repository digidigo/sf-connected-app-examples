import passport from "../../utils/passport";

export default async function handler(req, res) {
  if (req.method === "GET") {
    passport.authenticate("salesforce")(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
