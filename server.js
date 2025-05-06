// openai에서 최신 방식으로 불러오기
const OpenAI = require("openai");
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/ask', async (req, res) => {
  const { input, type } = req.body;
  const stylePrompt = type === 'T'
  ? "문제의 핵심을 잘 짚어서, 똑똑하고 현실적인 조언을 해줘. 말투는 단호하지만 친절하게. 이모지도 약간 섞어줘. 질문: "
  : "친근하고 귀엽고 따뜻한 말투로 답해줘. 이모지(😊, 🧡 등)도 섞고, 친구처럼 공감해줘. 질문: ";

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ← 이걸로 바꿔!
      messages: [
        { role: "user", content: stylePrompt + input }
      ],
      max_tokens: 300,
      temperature: 0.8
    });


    res.json({ answer: chatCompletion.choices[0].message.content });

  } catch (error) {
    console.error("GPT 에러:", error);
    res.status(500).json({ answer: "GPT 응답 중 문제가 발생했어 😢" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
