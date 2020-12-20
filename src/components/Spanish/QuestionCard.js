import React, { useState, useEffect } from 'react'
import { Card, Button} from 'react-bootstrap'
import QuestionModal from './QuestionModel'


const QuestionCard = ({ question, getNextIndex, getPrevIndex, index, numQuestion }) => {
    const [answers, setAnswers] = useState([])

    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState({});

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setAnswers(question.incorrect_answers.concat([question.correct_answer]).sort(() => Math.random() - 0.5))
        // eslint-disable-next-line
    }, [index])

    const onOptionClicked = (option) => {
        setAnswered(true);
        setSelectedOption(option);
    };

    const isCorrect = (option) => {
        return option === question.correct_answer;
    };





    return (
        <Card className="text-center">
            <Card.Header>
                <h4 className="question-text float-left">{question.question}</h4>
                <Button variant="secondary" className="float-right" onClick={(_) => setModalOpen(true)}>
                    <i className="fas fa-plus"></i>
                </Button>
                <QuestionModal isOpen={modalOpen} closeModal={closeModal} />
            </Card.Header>
            {answers
                .map((option, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => onOptionClicked(option)}
                            disabled={answered && !isCorrect(option)}
                            className={`question-option ${answered &&
                                isCorrect(option) &&
                                "correct"}
                  ${answered && selectedOption === option && !isCorrect(option) && "wrong"}
                  `}
                        >
                            <span>
                                {answered ? (isCorrect(option) ? "✔" : "X") : index + 1}
                            </span>
                            {option}
                        </button>
                    );
                })}
            <Card.Footer className="text-muted">
                <Button className=" float-left" variant="secondary" onClick={() => {
                    getPrevIndex();
                    setAnswered(false);
                }}>
                    <i className="fas fa-chevron-left"></i>
                </Button><span>{index}/{numQuestion}</span>
                <Button className="float-right" variant="secondary" onClick={() => {
                    getNextIndex();
                    setAnswered(false);
                }}>
                    <i className="fas fa-chevron-right"></i>
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default QuestionCard
