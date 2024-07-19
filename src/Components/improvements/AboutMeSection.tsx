import React, { useState, useEffect } from "react";
import { AboutMeRecommendations } from "../../Domain/ResumeImprovementType";
import { ChatGptImproveAboutMe } from "../../Services/api";
import EditableText from "../EditableText";
import { useResume } from "../../Services/ResumeContext";

interface AboutMeSectionProps {
    aboutMe: AboutMeRecommendations;
    onTextChange: (key: string, newValue: string) => void;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ aboutMe, onTextChange }) => {
    const { resume } = useResume();
    const [undoHistory, setUndoHistory] = useState<string[]>([]);
    const [redoHistory, setRedoHistory] = useState<string[]>([]);
    const [currentDescription, setCurrentDescription] = useState<string>(aboutMe.description);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setCurrentDescription(aboutMe.description);
    }, [aboutMe.description]);

    const handleImproveWithAI = async () => {
        try {
            setIsLoading(true);

            const description = aboutMe.description.length === 0 ? 
            `${resume?.name} ${resume?.headLine}` : aboutMe.description;

            const response = await ChatGptImproveAboutMe(description);

            saveStateToHistory(currentDescription);
            clearRedoHistory();

            onTextChange('description', response);
            setIsLoading(false);
        } catch (error) {
            console.error("Error improving about me", error);
        }
    };

    const saveStateToHistory = (state: string) => {
        setUndoHistory((prevHistory) => [state, ...prevHistory]);
    };

    const clearRedoHistory = () => {
        setRedoHistory([]);
    };

    const handleUndo = () => {
        if (undoHistory.length > 0) {
            const previousState = undoHistory[0];
            setUndoHistory((prevHistory) => prevHistory.slice(1));
            setRedoHistory((prevRedoHistory) => [currentDescription, ...prevRedoHistory]);
            setCurrentDescription(previousState);
            onTextChange('description', previousState);
        }
    };

    const handleRedo = () => {
        if (redoHistory.length > 0) {
            const nextState = redoHistory[0];
            setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(1));
            setUndoHistory((prevUndoHistory) => [currentDescription, ...prevUndoHistory]);
            setCurrentDescription(nextState);
            onTextChange('description', nextState);
        }
    };

    const handleChange = (newValue: string) => {
        saveStateToHistory(currentDescription);
        clearRedoHistory();
        setCurrentDescription(newValue);
        onTextChange('description', newValue);
    };

    return (
        <section>
            <h3>About Me</h3>
            <p><strong>Solution with span:</strong> <span className="textarea" role="textbox"></span></p>
            <p>
                <strong>New Description:</strong>
                <EditableText
                    value={currentDescription}
                    onChange={handleChange}
                    isTextarea
                />
                <button className="aiImproveButton" onClick={handleImproveWithAI}>{isLoading ? "Loading..." : "Improve With AI"}</button>
                <button className="undoButton" onClick={handleUndo} disabled={undoHistory.length === 0}>Undo</button>
                <button className="redoButton" onClick={handleRedo} disabled={redoHistory.length === 0}>Redo</button>
            </p>
            <h4>Recommendations</h4>
            <ul>
                {aboutMe.recommendations?.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
        </section>
    );
};

export default AboutMeSection;
