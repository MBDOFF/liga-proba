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

    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) return res.status(404).json({ message: "Postarea nu a fost găsită" });

    const user = await db.collection("users").findOne({ _id: post.userId });
    const userName = user?.profile?.name || "Anonim";

    res.status(200).json({ post: { ...post, userName } });
  } catch (err) {
    console.error("Eroare la preluarea postării:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
