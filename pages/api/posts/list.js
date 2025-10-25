import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodă neacceptată" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ideahub");

    const posts = await db
      .collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const userIds = posts.map((i) => i.userId).filter(Boolean);

    const users = await db
      .collection("users")
      .find({ _id: { $in: userIds } })
      .toArray();

    const userMap = {};
    users.forEach((u) => {
      userMap[u._id] = u.profile?.name || "Anonim";
    });

    const postsWithNames = posts.map((post) => ({
      ...post,
      userName: userMap[post.userId] || "Anonim",
    }));

    res.status(200).json({ posts: postsWithNames });
  } catch (err) {
    console.error("Eroare la listarea postărilor:", err);
    res.status(500).json({ message: "Eroare de server" });
  }
}
