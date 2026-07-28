import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition({
  language = "en-IN",
  onResult,
}) {
  const recognitionRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      setTranscript(
        finalText || interimText
      );

      if (finalText) {
        onResult?.(finalText);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language, onResult]);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    setTranscript("");

    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
  };
}