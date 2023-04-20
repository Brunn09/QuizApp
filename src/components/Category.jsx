import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import CategoryImg from '../img/category.svg'

import './Category.css'

const Category = () => {

    const [quizState, dispatch] = useContext(QuizContext)

    const questionsComplete = quizState.questionsComplete
  return (
    <div id='category_container'>
        <h2>Escolha umas das categorias abaixo</h2>
        {questionsComplete.map((question) => (
            <div className='categories' onClick={() => dispatch({type: 'SHOW_QUESTIONS', payload: { category: question.category }})} key={question.category}>
                    {question.category}
            </div>
        ))}
        <img src={CategoryImg} alt='categorias' />
    </div>
  )
}

export default Category