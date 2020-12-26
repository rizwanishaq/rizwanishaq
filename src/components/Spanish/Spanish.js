import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
import useFetch from './useFetch'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



const Spanish = () => {
    const { questions, loading, error } = useFetch("https://shrouded-brushlands-72921.herokuapp.com/questions")
    const [index, setIndex] = useState(0)



    const getNextIndex = () => {
        setIndex(prevState => prevState + 1 > questions.length ? prevState : prevState + 1)
    }

    const getPrevIndex = () => {
        setIndex(prevState => prevState - 1 < 0 ? prevState : prevState - 1)
    }


    if (loading) return  <Loader
    type="Puff"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000} //3 secs
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
