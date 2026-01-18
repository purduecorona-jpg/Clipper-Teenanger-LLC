const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- MOCK DANE UŻYTKOWNIKÓW ---
let users = [
  { id: "1", username: "alice", subscriptionName: "Silver", points: 0, level: 1 },
  { id: "2", username: "bob", subscriptionName: "Premium", points: 50, level: 1 },
  { id: "3", username: "charlie", subscriptionName: "Monster", points: 120, level: 2 }
];

// --- MOCK POSTÓW ---
let posts = [
  {
    _id: "p1",
    author: users[0],
    type: "image",
    url: "https://placekitten.com/400/250",
    likes: 3,
    comments: [{ id: "c1", text: "Świetne!" }]
  },
  {
    _id: "p2",
    author: users[1],
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 10,
    comments: []
  }
];

// --- API POSTS ---
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.post("/api/posts/create", (req, res) => {
  const { authorId, type, url } = req.body;
  const author = users.find(u => u.id === authorId);
  if (!author) return res.status(404).json({ error: "Brak użytkownika" });

  // Ograniczenie subskrypcji Silver
  if (author.subscriptionName === "Silver" && type === "video") {
    return res.status(403).json({ error: "Silver może dodawać tylko zdjęcia" });
  }

  const newPost = {
    _id: `p${posts.length + 1}`,
    author,
    type,
    url,
    likes: 0,
    comments: []
  };
  posts.push(newPost);
  res.json(newPost);
});

// --- GAMIFIKACJA ---
app.post("/api/gamification/add-points", (req, res) => {
  const { userId, points } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Brak użytkownika" });

  if (!["Premium", "Monster"].includes(user.subscriptionName)) {
    return res.status(403).json({ error: "Gamifikacja dostępna tylko dla Premium/Monster" });
  }

  user.points += points;
  user.level = Math.floor(user.points / 100) + 1;
  res.json({ points: user.points, level: user.level });
});

// --- LIVE (tylko Monster) ---
app.post("/api/live/start", (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Brak użytkownika" });

  if (user.subscriptionName !== "Monster") {
    return res.status(403).json({ error: "Tylko Monster może prowadzić live" });
  }

  const liveUrl = `http://localhost:5000/live/${user.id}`;
  res.json({ streamId: `live_${Date.now()}`, url: liveUrl });
});

app.listen(PORT, () => {
  console.log(`Testowy backend działa na http://localhost:${PORT}`);
});
