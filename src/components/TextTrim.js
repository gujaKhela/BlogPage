const trimTextToWords = (text, maxWords) => {
  const words = text.split(' ');
  const trimmedWords = words.slice(0, maxWords);
  return trimmedWords.join(' ');
};

export default trimTextToWords ;