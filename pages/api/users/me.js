import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { name, birthdate } = req.body;

  if (!name || !birthdate) {
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

    await db.collection("users").updateOne(
      { _id: session.userId },
      { $set: { "profile.name": name, "profile.birthdate": birthdate } }
    );

    res.status(200).json({ message: "Profilul a fost actualizat cu succes" });
  } catch (err) {
    console.error("Eroare la actualizarea profilului:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
