import React, { useState, useEffect } from 'react';
import { useTasks } from '../../../context/TaskContext';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useVoiceParser } from '../hooks/useVoiceParser';
import VoiceRecorder from './VoiceRecorder';
import TranscriptDisplay from './TranscriptDisplay';
import TaskReviewForm from './TaskReviewForm';

const VoiceInput = ({ onTaskCreated }) => {
    const { addTask } = useTasks();
    const { isRecording, transcript, error, toggleRecording } = useVoiceRecognition();
    const { parseVoiceInput } = useVoiceParser();
    const [parsedData, setParsedData] = useState(null);

    useEffect(() => {
        if (transcript) {
            const data = parseVoiceInput(transcript);
            setParsedData(data);
        }
    }, [transcript]);

    const handleSave = () => {
        if (parsedData) {
            addTask(parsedData);
            onTaskCreated();
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-800 text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Voice Task Creation</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <VoiceRecorder
                isRecording={isRecording}
                onToggleRecording={toggleRecording}
            />

            <TranscriptDisplay transcript={transcript} />

            <TaskReviewForm
                parsedData={parsedData}
                setParsedData={setParsedData}
                onSave={handleSave}
                onDiscard={() => setParsedData(null)}
            />
        </div>
    );
};

export default VoiceInput;
