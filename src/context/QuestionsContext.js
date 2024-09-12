import React from 'react'

const QuestionsContext = React.createContext({
  totalquestions: '',
  questionsList: [],
  timer: 10,
  answered: 0,
  unanswered: 10,
  score: 0,
  islastquestion: false,
  isSubmmited: false,
  updateQuestionslist: () => {},
  updateScore: () => {},
  updateTimer: () => {},
  updateAsAnswered: () => {},
})

export default QuestionsContext
