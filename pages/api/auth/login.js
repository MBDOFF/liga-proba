import clientPromise from "../../../lib/mongodb";
import { verifyPassword, generateToken, SESSION_VALIDITY } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email sau parolă lipsă" });

  const client = await clientPromise;
  const db = client.db("ideahub");

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(401).json({ message: "Credențiale invalide" });

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Credențiale invalide" });

  await db.collection("users").updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

  const token = generateToken();
  const expiry = new Date(Date.now() + SESSION_VALIDITY);

  await db.collection("sessions").insertOne({
    userId: user._id,
    token,
    validUntil: expiry,
  });

  res.setHeader("Set-Cookie", `session=${token}; HttpOnly; Path=/; Max-Age=${SESSION_VALIDITY/1000}`);

  res.status(200).json({ message: "Autentificare reușită" });
}
