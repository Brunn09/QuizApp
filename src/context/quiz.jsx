import { createContext, useReducer } from "react";

/*import questions from '../data/questions'*/
import questionsComplete from '../data/questions_complete'

export const QuizContext = createContext();

const STAGES = ['Start', 'Category', 'Playing', 'End']

const initialState = {
    gameStage: STAGES[0],
    questionsComplete,
    selectedCategory: false,
    indexCategory: 0,
    currentQuestion: 0,
    score: 0,
    answerSelected: false
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case 'CHANGE_STATE':
            return {
                ...state,
                gameStage: STAGES[1]
            };

        case 'SHOW_QUESTIONS':
            const category = action.payload.category
            let categoryIndex = 0

            if(category == 'CSS') {
                categoryIndex = 1
            } else {
                if(category == 'JavaScript') {
                    categoryIndex = 2
                } else {
                    categoryIndex = 0
                }
            }


            return {
                ...state,
                gameStage: STAGES[2],
                selectedCategory: category,
                indexCategory: categoryIndex,
            };

        /*case 'REORDER_QUESTIONS':
            
            const reorderedQuestions = questionsComplete.sort(() => {
                return Math.random() - .5;
            })
            return {
                ...state,
                questionsComplete: reorderedQuestions
            };*/

        case 'CHANGE_QUESTION':
            const nextQuestion = state.currentQuestion ++
            let endGame = false

            if(!questionsComplete[state.indexCategory].questions[nextQuestion]){
                endGame = true
            }
            return {
                ...state,
                currentQuestion: nextQuestion,
                answerSelected: false,
                gameStage: endGame ? STAGES[3] : state.gameStage,
            };

        case 'RESTART':
            return initialState;

        case 'CHECKED_ANSWER':
            if(state.answerSelected) return state

            const answer = action.payload.answer
            const option = action.payload.option
            let correctAnswer = 0;

            if(answer === option) correctAnswer = 1
            
            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option
            }

        default:
            return state;
    }
}


export const QuizProvider = ({children}) => {

    const value = useReducer(quizReducer, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
};