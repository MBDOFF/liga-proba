import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const token = req.cookies.session;
  if (!token) return res.status(401).json({ message: "Nu există sesiune" });

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    const session = await db.collection("sessions").findOne({ token });
    if (!session || session.validUntil < new Date()) {
      return res.status(401).json({ message: "Sesiune invalidă sau expirată" });
    }

    const users = await db
      .collection("users")
      .find({})
      .sort({ "profile.name": 1 })
      .toArray();

    res.status(200).json({ users });
  } catch (err) {
    console.error("Eroare la listarea userilor:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
