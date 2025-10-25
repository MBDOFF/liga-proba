import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { id, name, description, imageUrl } = req.body;
  if (!id || !name || !description || !imageUrl) {
    return res.status(400).json({ message: "Toate câmpurile sunt obligatorii" });
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

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description, imageUrl, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Postarea nu a fost găsită" });
    }

    res.status(200).json({ message: "Postarea a fost actualizată cu succes" });
  } catch (err) {
    console.error("Eroare la actualizarea postării:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
