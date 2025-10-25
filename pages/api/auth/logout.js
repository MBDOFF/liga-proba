import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ideahub");

  const token = req.cookies.session;
  if (token) {
    await db.collection("sessions").deleteOne({ token });
    res.setHeader("Set-Cookie", `session=; HttpOnly; Path=/; Max-Age=0`);
  }

  res.status(200).json({ message: "Deconectare reușită" });
}
