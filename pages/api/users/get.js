import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "ID-ul userului este obligatoriu" });

  const token = req.cookies.session;
  if (!token) return res.status(401).json({ message: "Nu există sesiune" });

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    const session = await db.collection("sessions").findOne({ token });
    if (!session || session.validUntil < new Date()) {
      return res.status(401).json({ message: "Sesiune invalidă sau expirată" });
    }

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "Userul nu a fost găsit" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Eroare la preluarea userului:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
