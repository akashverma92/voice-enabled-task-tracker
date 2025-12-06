import { useState, useEffect, useRef } from 'react';

export const useVoiceRecognition = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);
    const silenceTimer = useRef(null);

    const resetSilenceTimer = () => {
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        silenceTimer.current = setTimeout(() => {
            console.log('Auto-stopping due to silence');
            stopRecording();
        }, 20000); // 20 seconds silence timeout
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true; // Changed to true to detect speech in progress
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsRecording(true);
                resetSilenceTimer();
            };

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                // Only set final results or interim if needed, but here we just want to detect activity
                if (event.results[0].isFinal) {
                    setTranscript(text);
                }
                resetSilenceTimer(); // Reset timer on any speech activity
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setError(event.error);
                setIsRecording(false);
                if (silenceTimer.current) clearTimeout(silenceTimer.current);
            };

            recognition.onend = () => {
                setIsRecording(false);
                if (silenceTimer.current) clearTimeout(silenceTimer.current);
            };

            recognitionRef.current = recognition;
        } else {
            setError('Speech recognition is not supported in this browser.');
        }

        return () => {
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        };
    }, []);

    const startRecording = () => {
        setTranscript('');
        setError(null);
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
            }
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return { isRecording, transcript, error, toggleRecording };
};
