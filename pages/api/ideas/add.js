import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const token = req.cookies.session;
  if (!token) return res.status(401).json({ message: "Nu există sesiune" });

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    const session = await db.collection("sessions").findOne({ token });
    if (!session || new Date(session.validUntil) < new Date()) {
      return res.status(401).json({ message: "Sesiune invalidă sau expirată" });
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) return res.status(404).json({ message: "Utilizatorul nu a fost găsit" });

    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Completează toate câmpurile" });
    }

    const newIdea = {
      name,
      description,
      userId: user._id,
      createdAt: new Date(),
    };

    const result = await db.collection("ideas").insertOne(newIdea);

    res.status(201).json({
      message: "Ideea a fost adăugată cu succes",
      idea: { _id: result.insertedId, ...newIdea },
    });
  } catch (err) {
    console.error("Eroare la adăugarea ideii:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}