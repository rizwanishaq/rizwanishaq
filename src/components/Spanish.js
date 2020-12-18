import React, { useState, useEffect } from 'react'
import axios from "axios"
import QuestionCard from './QuestionCard'


const Spanish = () => {
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const getQuestions = async () => {
            const response = await axios.get(
                "https://shrouded-brushlands-72921.herokuapp.com/questions"
              );
              setQuestions(response.data.data);
        }
        getQuestions()
    }, [])


    const getNextIndex = () => {
        setIndex(prevState => prevState + 1> questions.length ? prevState : prevState+1)
    }

    const getPrevIndex = () => {
        setIndex(prevState => prevState - 1 <0 ? prevState : prevState-1)
    }
    
    

    return (
        <>
        
            {
            questions.length>0 && <QuestionCard 
                question={questions[parseInt(index)]} 
                getNextIndex={getNextIndex}
                getPrevIndex={getPrevIndex}
                index={index}
                numQuestion={questions.length}
                />
            }
        </>
    )
}

export default Spanish
