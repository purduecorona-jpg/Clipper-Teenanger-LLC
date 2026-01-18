import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const quizQuestions = [
  { question: "Czy czujesz się dziś szczęśliwy?", options: ["Tak", "Nie"], correct: 0 },
  { question: "Czy jesteś zmęczony?", options: ["Tak", "Nie"], correct: 1 },
];

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const answerQuestion = (index) => {
    if (index === quizQuestions[current].correct) setScore(score + 1);
    if (current + 1 < quizQuestions.length) setCurrent(current + 1);
    else setFinished(true);
  };

  if (finished) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Twój wynik: {score}/{quizQuestions.length}</Text>
        <Button title="Powtórz quiz" onPress={() => { setCurrent(0); setScore(0); setFinished(false); }} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>{quizQuestions[current].question}</Text>
      {quizQuestions[current].options.map((opt, idx) => (
        <Button key={idx} title={opt} onPress={() => answerQuestion(idx)} />
      ))}
    </View>
  );
}
