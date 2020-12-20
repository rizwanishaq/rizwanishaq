import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import QuestionModal from './QuestionModel'
import { useSpeechSynthesis } from 'react-speech-kit';


const QuestionCard = ({ question, getNextIndex, getPrevIndex, index, numQuestion }) => {
    const [answers, setAnswers] = useState([])
    const { speak, voices, cancel } = useSpeechSynthesis();

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
                <h4 className="question-text float-left"
                    onClick={() => speak({ text: question.question, voice: voices[0] })}
                    onMouseLeave={() => cancel()}
                >
                    {question.question}
                </h4>
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
                            // onMouseEnter={() => speak({ text: option, voice: voices[0]})}
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


// 0: SpeechSynthesisVoice {voiceURI: "Microsoft Helena Desktop - Spanish (Spain)", name: "Microsoft Helena Desktop - Spanish (Spain)", lang: "es-ES", localService: true, default: true}
// 1: SpeechSynthesisVoice {voiceURI: "Microsoft David Desktop - English (United States)", name: "Microsoft David Desktop - English (United States)", lang: "en-US", localService: true, default: false}
// 2: SpeechSynthesisVoice {voiceURI: "Microsoft Zira Desktop - English (United States)", name: "Microsoft Zira Desktop - English (United States)", lang: "en-US", localService: true, default: false}
// 3: SpeechSynthesisVoice {voiceURI: "Microsoft Hazel Desktop - English (Great Britain)", name: "Microsoft Hazel Desktop - English (Great Britain)", lang: "en-GB", localService: true, default: false}
// 4: SpeechSynthesisVoice {voiceURI: "Google Deutsch", name: "Google Deutsch", lang: "de-DE", localService: false, default: false}
// 5: SpeechSynthesisVoice {voiceURI: "Google US English", name: "Google US English", lang: "en-US", localService: false, default: false}
// 6: SpeechSynthesisVoice {voiceURI: "Google UK English Female", name: "Google UK English Female", lang: "en-GB", localService: false, default: false}
// 7: SpeechSynthesisVoice {voiceURI: "Google UK English Male", name: "Google UK English Male", lang: "en-GB", localService: false, default: false}
// 8: SpeechSynthesisVoice {voiceURI: "Google español", name: "Google español", lang: "es-ES", localService: false, default: false}
// 9: SpeechSynthesisVoice {voiceURI: "Google español de Estados Unidos", name: "Google español de Estados Unidos", lang: "es-US", localService: false, default: false}
// 10: SpeechSynthesisVoice {voiceURI: "Google français", name: "Google français", lang: "fr-FR", localService: false, default: false}
// 11: SpeechSynthesisVoice {voiceURI: "Google हिन्दी", name: "Google हिन्दी", lang: "hi-IN", localService: false, default: false}
// 12: SpeechSynthesisVoice {voiceURI: "Google Bahasa Indonesia", name: "Google Bahasa Indonesia", lang: "id-ID", localService: false, default: false}
// 13: SpeechSynthesisVoice {voiceURI: "Google italiano", name: "Google italiano", lang: "it-IT", localService: false, default: false}
// 14: SpeechSynthesisVoice {voiceURI: "Google 日本語", name: "Google 日本語", lang: "ja-JP", localService: false, default: false}
// 15: SpeechSynthesisVoice {voiceURI: "Google 한국의", name: "Google 한국의", lang: "ko-KR", localService: false, default: false}
// 16: SpeechSynthesisVoice {voiceURI: "Google Nederlands", name: "Google Nederlands", lang: "nl-NL", localService: false, default: false}
// 17: SpeechSynthesisVoice {voiceURI: "Google polski", name: "Google polski", lang: "pl-PL", localService: false, default: false}
// 18: SpeechSynthesisVoice {voiceURI: "Google português do Brasil", name: "Google português do Brasil", lang: "pt-BR", localService: false, default: false}
// 19: SpeechSynthesisVoice {voiceURI: "Google русский", name: "Google русский", lang: "ru-RU", localService: false, default: false}
// 20: SpeechSynthesisVoice {voiceURI: "Google 普通话（中国大陆）", name: "Google 普通话（中国大陆）", lang: "zh-CN", localService: false, default: false}
// 21: SpeechSynthesisVoice {voiceURI: "Google 粤語（香港）", name: "Google 粤語（香港）", lang: "zh-HK", localService: false, default: false}
// 22: SpeechSynthesisVoice {voiceURI: "Google 國語（臺灣）", name: "Google 國語（臺灣）", lang: "zh-TW", localService: false, default: false}
