import React, { useState } from 'react';
import { Achievements } from '../../Domain/ResumeImprovementType';
import EditableText from '../EditableText';
import { ChatGptImproveAchievement } from '../../Services/api';
import "./AchievementsSection.css";

interface AchievementsSectionProps {
    achievements: Achievements;
    experienceIndex: number;
    onTextChange: (key: string, newValue: string) => void;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, experienceIndex, onTextChange }) => {
    const [histories, setHistories] = useState<{ undo: string[][], redo: string[][] }>({ undo: [], redo: [] });
    const [showModal, setShowModal] = useState<{ visible: boolean, suggestions: string[], achIndex: number | null }>({ visible: false, suggestions: [], achIndex: null });
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

    const handleImproveWithAI = async (achIndex: number) => {
        try {
            setLoadingIndex(achIndex);
            const response = await ChatGptImproveAchievement(achievements.achievements[achIndex].fullDescription);
            setShowModal({ visible: true, suggestions: response, achIndex });
            setLoadingIndex(null);
        } catch (error) {
            console.error("Error improving achievement", error);
            setLoadingIndex(null);
        }
    }

    const saveStateToHistory = (achIndex: number, state: string) => {
        setHistories((prevHistories) => {
            const newUndoHistory = [...prevHistories.undo];
            newUndoHistory[achIndex] = [state, ...(newUndoHistory[achIndex] || [])];
            return { ...prevHistories, undo: newUndoHistory };
        });
    };

    const clearRedoHistory = (achIndex: number) => {
        setHistories((prevHistories) => {
            const newRedoHistory = [...prevHistories.redo];
            newRedoHistory[achIndex] = [];
            return { ...prevHistories, redo: newRedoHistory };
        });
    };

    const handleUndo = (achIndex: number) => {
        if (histories.undo[achIndex]?.length > 0) {
            const previousState = histories.undo[achIndex][0];
            setHistories((prevHistories) => {
                const newUndoHistory = [...prevHistories.undo];
                newUndoHistory[achIndex] = prevHistories.undo[achIndex].slice(1);

                const newRedoHistory = [...prevHistories.redo];
                newRedoHistory[achIndex] = [achievements.achievements[achIndex].fullDescription, ...(newRedoHistory[achIndex] || [])];

                return { undo: newUndoHistory, redo: newRedoHistory };
            });
            onTextChange(`achievements-${experienceIndex}-${achIndex}`, previousState);
        }
    };

    const handleRedo = (achIndex: number) => {
        if (histories.redo[achIndex]?.length > 0) {
            const nextState = histories.redo[achIndex][0];
            setHistories((prevHistories) => {
                const newRedoHistory = [...prevHistories.redo];
                newRedoHistory[achIndex] = prevHistories.redo[achIndex].slice(1);

                const newUndoHistory = [...prevHistories.undo];
                newUndoHistory[achIndex] = [achievements.achievements[achIndex].fullDescription, ...(newUndoHistory[achIndex] || [])];

                return { undo: newUndoHistory, redo: newRedoHistory };
            });
            onTextChange(`achievements-${experienceIndex}-${achIndex}`, nextState);
        }
    };

    const handleChange = (achIndex: number, newValue: string) => {
        saveStateToHistory(achIndex, achievements.achievements[achIndex].fullDescription);
        clearRedoHistory(achIndex);
        onTextChange(`achievements-${experienceIndex}-${achIndex}`, newValue);
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (showModal.achIndex !== null) {
            saveStateToHistory(showModal.achIndex, achievements.achievements[showModal.achIndex].fullDescription);
            clearRedoHistory(showModal.achIndex);
            onTextChange(`achievements-${experienceIndex}-${showModal.achIndex}`, suggestion);
            setShowModal({ visible: false, suggestions: [], achIndex: null });
        }
    };

    return (
        <div>
            {achievements?.achievements?.map((achievement, achIndex) => (
                <div key={achIndex}>
                        <EditableText
                            value={achievement.fullDescription}
                            onChange={(newValue) => handleChange(achIndex, newValue)}
                            isTextarea
                        />
                        <button className="aiImproveButton" onClick={() => handleImproveWithAI(achIndex)} disabled={loadingIndex === achIndex}>
                            {loadingIndex === achIndex ? 'Loading...' : 'Improve With AI'}
                        </button>
                        <button className="undoButton" onClick={() => handleUndo(achIndex)} disabled={!(histories.undo[achIndex]?.length)}>Undo</button>
                        <button className="redoButton" onClick={() => handleRedo(achIndex)} disabled={!(histories.redo[achIndex]?.length)}>Redo</button>
                    <ol>
                        {achievement.achievementRecommendations.map((rec, recIndex) => (
                            <li key={recIndex}>{rec}</li>
                        ))}
                    </ol>
                </div>
            ))}
            {showModal.visible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Choose a suggestion</h3>
                        <ul>
                            {showModal.suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowModal({ visible: false, suggestions: [], achIndex: null })}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AchievementsSection;
