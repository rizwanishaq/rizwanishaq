import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { downsampleBuffer } from "./utilities/utilities";
import { Card, ListGroup, Container, Alert } from "react-bootstrap";

const ProcessAudio = ({labels, model}) => {
  const NUM_INPUT_SAMPLES = 1024;
  const MODEL_SAMPLE_RATE = 16000;

  const [error, setError] = useState("");
  const [top5, setTop5] = useState([]);


  let audio_stack = [];

  const audioContext = useRef(null);
  const handleSuccess = (stream) => {
    audioContext.current = new AudioContext({
      latencyHint: "playback",
    });

    const source = audioContext.current.createMediaStreamSource(stream);
    const processor = audioContext.current.createScriptProcessor(
      NUM_INPUT_SAMPLES,
      1,
      1
    );
    // Converts audio to mono.
    processor.channelInterpretation = "speakers";
    processor.channelCount = 1;

    // Runs processor on audio source.
    source.connect(processor);

    processor.connect(audioContext.current.destination);

    processor.onaudioprocess = async (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const downsampledBuffer = downsampleBuffer(
        inputData,
        audioContext.current.sampleRate,
        MODEL_SAMPLE_RATE
      );
      audio_stack.push(downsampledBuffer);
      if (audio_stack.length === 16) {
        const inputData = audio_stack.reduce((acc, curr) =>
          Float32Array.from([...acc, ...curr])
        );

        // inputData_n = normalize(inputData)

        const input = tf.tensor(inputData);
        // eslint-disable-next-line
        const [scores, embeddings, spectrogram] = model.predict(input);
        audio_stack = [];

        // eslint-disable-next-line
        const { values, indices } = await scores.mean(0).topk(5);
        const indexs = indices.toString().split("\n")[1];

        const re = indexs
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((data) => labels[Number(data)]);

        setTop5(re);
      }
    };
  };

  const handleError = (err) => {
    setError(err);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
      .catch(handleError);
    

    return () => {
      audioContext.current && audioContext.current.close();
      console.log("Component unmounted");
    };
    // eslint-disable-next-line
  }, []);


  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Header>Detected Events</Card.Header>
        <ListGroup>
          {top5.map((item, index) => (
            <ListGroup.Item key={index} variant={index === 0 ? "success" : ""}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ProcessAudio;
