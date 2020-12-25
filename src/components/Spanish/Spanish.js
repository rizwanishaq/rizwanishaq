import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
import { Spinner } from 'react-bootstrap'
import useFetch from './useFetch'


const Spanish = () => {
    const { questions, loading, error } = useFetch("https://shrouded-brushlands-72921.herokuapp.com/questions")
    const [index, setIndex] = useState(0)



    const getNextIndex = () => {
        setIndex(prevState => prevState + 1 > questions.length ? prevState : prevState + 1)
    }

    const getPrevIndex = () => {
        setIndex(prevState => prevState - 1 < 0 ? prevState : prevState - 1)
    }


    if (loading) return <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
    />

    if(error) return <h1>{error}</h1>

    return (
        <>

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
