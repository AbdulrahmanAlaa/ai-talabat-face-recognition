export const speak = (text, onend = () => {}) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.onend = onend;
  window.speechSynthesis.speak(msg);
};
