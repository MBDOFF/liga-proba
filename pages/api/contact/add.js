import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Toate câmpurile sunt obligatorii" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Mesaj trimis cu succes" });
  } catch (err) {
    console.error("Eroare la adăugarea mesajului:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
