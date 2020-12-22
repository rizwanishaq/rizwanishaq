import React, { useState, useEffect } from 'react'
import axios from "axios"
import QuestionCard from './QuestionCard'
import { Spinner } from 'react-bootstrap'


const Spanish = () => {
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true)
            const response = await axios.get(
                "https://shrouded-brushlands-72921.herokuapp.com/questions"
            );
            setQuestions(response.data.data);
        }
        getQuestions()
        setLoading(false)
    }, [])


    const getNextIndex = () => {
        setIndex(prevState => prevState + 1 > questions.length ? prevState : prevState + 1)
    }

    const getPrevIndex = () => {
        setIndex(prevState => prevState - 1 < 0 ? prevState : prevState - 1)
    }



    return (
        <>
            {
                loading && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            }
            {
                questions.length > 0 && <QuestionCard
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
