import React, { useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import { Card, Button, Spinner } from "react-bootstrap";
import ProcessAudio from './ProcessAudio'

const EventDetection = () => {
    //   Constant for APP
    const MODEL_URL = "https://tfhub.dev/google/tfjs-model/yamnet/tfjs/1";
    const CLASS_MAP_URL =
        "https://raw.githubusercontent.com/rizwanishaq/event-detection-tensorflow/main/src/yamnet_class_map.csv";

    const [labels, setLabels] = useState({});
    const [model, setModel] = useState(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        fetch(CLASS_MAP_URL)
            .then((response) => response.text())
            .then((json) => {
                const labelarray = json.split("\n");
                // eslint-disable-next-line
                labelarray.map((array) => {
                    const split = array.split(",");

                    if (split[0] !== "index" && split !== undefined) {
                        setLabels((prevState) => ({
                            ...prevState,
                            [split[0]]: split[2],
                        }));
                    }
                });
            });
    }, []);

    useEffect(() => {
        const loadModel = async () => {
            const model = await tf.loadGraphModel(MODEL_URL, {
                fromTFHub: true,
            });
            setModel(model);
            console.log('model loaded')
        };
        loadModel();
    }, []);



    const stopHandler = (e) => {
        setStart(false);
    };

    const startHandler = (e) => {
        setStart(true);
    };


    return (
        <Card className="text-center">
            <Card.Header>{model ? (
                <>
                <Button variant="secondary" className="float-right" onClick={startHandler} disabled={start}>
                        <i className="fas fa-play"></i>Start
                </Button>
                <Button variant="secondary" className="float-left" onClick={stopHandler} disabled={!start}>
                        <i className="fas fa-stop-circle"></i>Stop
                </Button>
                </>
            ) : (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                model loading...
                    </Button>)}</Card.Header>

            {model && start && <ProcessAudio labels={labels} model={model} />}
        </Card>
    );

}

export default EventDetection
