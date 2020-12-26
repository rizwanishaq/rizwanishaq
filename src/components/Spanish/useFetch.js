import {useState, useEffect} from 'react'
import axios from "axios"


const useFetch = (uri) => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true)
            const response = await axios.get(
                uri
            );
            setQuestions(response.data.data);
            setLoading(false)

        }
        try {
            getQuestions()
            
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }, [uri])

    return {questions, loading, error}
}

export default useFetch
