// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "https://survey-frontend.vercel.app"  // 你的前端地址
}));
app.use(bodyParser.json());

const FILE_PATH = "./responses.json";

// 提交问卷
app.post("/submit", (req, res) => {
  const data = req.body;

  let responses = [];
  if (fs.existsSync(FILE_PATH)) {
    responses = JSON.parse(fs.readFileSync(FILE_PATH));
  }

  responses.push({
    ...data,
    submittedAt: new Date().toISOString(),
  });

  fs.writeFileSync(FILE_PATH, JSON.stringify(responses, null, 2));

  res.json({ message: "提交成功！" });
});

// 查看所有答卷（管理端）
app.get("/admin/responses", (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    const data = JSON.parse(fs.readFileSync(FILE_PATH));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
