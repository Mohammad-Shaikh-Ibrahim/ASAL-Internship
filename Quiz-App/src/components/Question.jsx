import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx"
import QUESTIONS from "../questions.js"
import { useState } from "react"
export default function Question(
    {
    questionIndex,
    onSelectAnswer,
    onSkipAnswer
    }){

        const [answer,setAnswer]=useState({
            selectedAnswer:'',
            isCorrect:null
        });

        let timer= 10000;

        if(answer.selectedAnswer){
            timer=1000;
        }

        if(answer.isCorrect !== null){
            timer = 2000;
        }

        function handelSelectAnswer(answer){
            setAnswer({
                selectedAnswer:answer,
                isCorrect: null
            })

            setTimeout(()=>{
                setAnswer({
                    selectedAnswer:answer,
                    isCorrect: QUESTIONS[questionIndex].answers[0] === answer
                })
                setTimeout(()=>{
                    onSelectAnswer(answer);
                },2000)        
            },1000);
        }

    let answerState='';
    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState= answer.isCorrect? 'correct': 'wrong';
    }else if(answer.selectedAnswer){
        answerState = 'answered'
    }
    return(
        <div id="question">
        <QuestionTimer 
        key={timer}
        timeout={timer} 
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
        />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answers 
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handelSelectAnswer}
        />
    </div>
    )
}