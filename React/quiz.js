import React, {useEffect, useState} from 'react';

const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {
  const [questions, setQuestions] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [chosenAnswers, setChosenAnswers] = useState([])
  
  useEffect(() => {
    const callFetch = async () => {
      const res = await fetch(QUIZ_API_BASE_URL)
      const data = await res.json()
      setQuestions(data)
    }
    callFetch()
  }, [])

  if(questions == null) return null

  const updateChosenAnswers = (questionIndex, answerIndex) => {
    const newChosenAnswers = [...chosenAnswers]
    newChosenAnswers[questionIndex] = answerIndex
    setChosenAnswers(newChosenAnswers)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === questions.length -1

  return (
    <>
      <h1>{currentQuestion.question}</h1>
      {currentQuestion.answers.map((answer, answerIndex) => {
        const chosenAnswer = chosenAnswers[currentQuestionIndex]
        let className = 'answer'

        if(chosenAnswer === answerIndex) {
          className += currentQuestion.correctAnswer === chosenAnswer ? ' correct' : ' incorrect'
        }
        return (
          <h2
            key={answer}
            className={className}
            onClick={() => {
              if(chosenAnswer != null) return
              updateChosenAnswers(currentQuestionIndex, answerIndex)
            }}
          >
            {answer}
          </h2>
        )
      })}
      <button
        disabled={isFirstQuestion}
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex-1)
        }}
      >
        Back
      </button>
      <button
        disabled={isLastQuestion || chosenAnswers[currentQuestionIndex] == null }
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex+1)
        }}
      >
        Next
      </button>
    </>
  );
}