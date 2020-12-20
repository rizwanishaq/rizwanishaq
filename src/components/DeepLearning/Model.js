import React, { useEffect, useState } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as tfvis from "@tensorflow/tfjs-vis"

const Model = () => {
    const [data, setData] = useState([])
    const [model, setModel] = useState(null)
    const [tensorData,setTensorData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
            const carsData = await carsDataResponse.json();
            const cleaned = carsData.map(car => ({
                mpg: car.Miles_per_Gallon,
                horsepower: car.Horsepower,
            }))
                .filter(car => (car.mpg != null && car.horsepower != null));


            setData(cleaned)
            
        }
        getData()
    }, [])


    useEffect(() => {
        const createmodel = () => {
            const _model = tf.sequential()

            _model.add(tf.layers.dense({inputShape: [1], units:1, useBias:true}))

            _model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
            _model.add(tf.layers.dense({units: 1, useBias: true}));

            setModel(_model)
        }
        createmodel()
    },[])


    useEffect(() => {
        if (data.length>1) {

            setTensorData(convertToTensor(data))
        }
    },[data])


 
const convertToTensor = (data) => {
    // Wrapping these calculations in a tidy will dispose any 
    // intermediate tensors.
    
    return tf.tidy(() => {
      // Step 1. Shuffle the data    
      tf.util.shuffle(data);
  
      // Step 2. Convert data to Tensor
      const inputs = data.map(d => d.horsepower)
      const labels = data.map(d => d.mpg);
  
      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
  
      //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();  
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();
  
      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
  
      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        // Return the min/max bounds so we can use them later.
        inputMax,
        inputMin,
        labelMax,
        labelMin,
      }
    });  
  }



  const testModel = () => {
    const {inputMax, inputMin, labelMin, labelMax} = tensorData  
    
    // Generate predictions for a uniform range of numbers between 0 and 1;
    // We un-normalize the data by doing the inverse of the min-max scaling 
    // that we did earlier.
    const [xs, preds] = tf.tidy(() => {
      
      const xs = tf.linspace(0, 1, 100);      
      const preds = model.predict(xs.reshape([100, 1]));      
      
      const unNormXs = xs
        .mul(inputMax.sub(inputMin))
        .add(inputMin);
      
      const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin);
      
      // Un-normalize the data
      return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });
    
   
    const predictedPoints = Array.from(xs).map((val, i) => {
      return {x: val, y: preds[i]}
    });
    
    const originalPoints = data.map(d => ({
      x: d.horsepower, y: d.mpg,
    }));
    
    
    tfvis.render.scatterplot(
      {name: 'Model Predictions vs Original Data'}, 
      {values: [originalPoints, predictedPoints], series: ['original', 'predicted']}, 
      {
        xLabel: 'Horsepower',
        yLabel: 'MPG',
        height: 300
      }
    );
  }

    const ploting = () => {
        const values = data.map(d => ({
            x: d.horsepower,
            y: d.mpg,
          }));
        
          tfvis.render.scatterplot(
            {name: 'Horsepower v MPG'},
            {values}, 
            {
              xLabel: 'Horsepower',
              yLabel: 'MPG',
              height: 300
            }
          );
        
          // More code will be added below
        }


        const trainModel = async () => {
            // Prepare the model for training.
            const {inputs, labels} = tensorData;  
            model.compile({
              optimizer: tf.train.adam(),
              loss: tf.losses.meanSquaredError,
              metrics: ['mse'],
            });
            
            const batchSize = 32;
            const epochs = 150;
            
            return await model.fit(inputs, labels, {
              batchSize,
              epochs,
              shuffle: true,
              callbacks: tfvis.show.fitCallbacks(
                { name: 'Training Performance' },
                ['loss', 'mse'], 
                { height: 200, callbacks: ['onEpochEnd'] }
              )
            });
          }
    

    return (
        <div>
            <button onClick={ploting}>Click to plot</button>
            <button onClick={() => {
                tfvis.show.modelSummary({name: 'Model Summary'}, model);
            }}>Click to check the model</button>
            <button onClick={trainModel}>Train Model</button>
            <button onClick={testModel}>Test Model</button>
        </div>
    )
}

export default Model
