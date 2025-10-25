import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const token = req.cookies.session;
  if (!token) return res.status(401).json({ message: "Nu există sesiune" });

  const client = await clientPromise;
  const db = client.db("ideahub");

  const session = await db.collection("sessions").findOne({ token });
  if (!session || session.validUntil < new Date()) {
    return res.status(401).json({ message: "Sesiune invalidă sau expirată" });
  }

  const user = await db.collection("users").findOne({ _id: session.userId });
  if (!user) return res.status(404).json({ message: "Utilizator nu a fost găsit" });

  res.status(200).json({ user });
}
