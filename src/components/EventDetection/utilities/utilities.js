export const downsampleBuffer = (
  buffer,
  recordSampleRate,
  targetSampleRate
) => {
  if (targetSampleRate === recordSampleRate) return buffer;
  if (targetSampleRate > recordSampleRate)
    throw new Error(
      "Target sample rate must be lower than recorded sample rate"
    );

  const sampleRateRatio = recordSampleRate / targetSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);

  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < result.length) {
    let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;

    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }

    result[offsetResult] = accum / count;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }

  return result;
};

export const normalize = (data) => {
  // Normalizing the data
  const absValue = data.map((sample) => {
    return Math.abs(sample);
  });
  const maxValue = Math.max(...absValue);
  const normalized = data.map((sample) => {
    return sample / maxValue;
  });
  return normalized;
};
