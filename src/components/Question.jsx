import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Option from './Option'

import './Question.css'

const Question = () => {
    
    const [quizState, dispatch] = useContext(QuizContext)
    
    const onSelectOption = ((option) => {
        dispatch({type: 'CHECKED_ANSWER',
        payload: { answer: quizState.questionsComplete[quizState.indexCategory].questions[quizState.currentQuestion].answer, option }
        })    
    })

    const selectedCategory = quizState.selectedCategory
    

  return (
    <div id='question'>

        <h2>Perguntas sobre {selectedCategory}</h2>

        <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questionsComplete[quizState.indexCategory].questions.length}</p>

        {quizState.questionsComplete[quizState.indexCategory].category === selectedCategory && (
            <>
                <h2>
                    {quizState.questionsComplete[quizState.indexCategory].questions[quizState.currentQuestion].question}
                </h2>
                    <div className="option_container">
                      {quizState.questionsComplete[quizState.indexCategory].questions[quizState.currentQuestion].options.map((option) => (
                          <Option
                              key={option}
                              option={option}
                              answer={quizState.questionsComplete[quizState.indexCategory].questions[quizState.currentQuestion].answer}
                              selectOption={() => onSelectOption(option)} />
                      ))}
                    </div>
            </>)
        }

        
        
        {quizState.answerSelected && (<button onClick={() => dispatch({type: 'CHANGE_QUESTION'})}>Continuar</button>)}
    </div>
  )
}

export default Question