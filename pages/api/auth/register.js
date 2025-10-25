import clientPromise from "../../../lib/mongodb";
import { hashPassword, generateToken, SESSION_VALIDITY } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }

  const { email, password, profile } = req.body;
  if (!email || !password || !profile || !profile.name || !profile.birthdate) return res.status(400).json({ message: "Email, parolă sau date profil lipsă" });

  const client = await clientPromise;
  const db = client.db("ideahub");

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) return res.status(422).json({ message: "Utilizatorul există deja" });

  const hashedPassword = await hashPassword(password);

  const user = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    profile,
    lastLogin: null,
    createdAt: new Date(),
  });

  const token = generateToken();
  const expiry = new Date(Date.now() + SESSION_VALIDITY);

  await db.collection("sessions").insertOne({
    userId: user.insertedId,
    token,
    validUntil: expiry,
  });

  res.setHeader("Set-Cookie", `session=${token}; HttpOnly; Path=/; Max-Age=${SESSION_VALIDITY/1000}`);
  res.status(201).json({ message: "Utilizator creat", userId: user.insertedId });
}
