import clientPromise from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  const { name, birthdate, email, password } = req.body;

  if (!name || !birthdate || !email || !password) {
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

    const existing = await db.collection("users").findOne({ email });
    if (existing) return res.status(400).json({ message: "Email deja folosit" });

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      profile: { name, birthdate },
      role: "user",
      createdAt: new Date(),
      lastLogin: null
    });

    res.status(200).json({ message: "User creat cu succes", userId: result.insertedId });
  } catch (err) {
    console.error("Eroare la adăugarea userului:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
