import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID-ul ideii lipsește" });

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    const idea = await db
      .collection("ideas")
      .findOne({ _id: new ObjectId(id) });

    if (!idea) return res.status(404).json({ message: "Ideea nu a fost găsită" });

    const user = await db.collection("users").findOne({ _id: idea.userId });
    const userName = user?.profile?.name || "Anonim";

    res.status(200).json({ idea: { ...idea, userName } });
  } catch (err) {
    console.error("Eroare la preluarea ideii:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
