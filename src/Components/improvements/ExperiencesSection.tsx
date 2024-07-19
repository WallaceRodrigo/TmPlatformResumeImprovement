import React, { useState } from 'react';
import { ExperienceRecommendations } from '../../Domain/ResumeImprovementType';
import EditableText from '../EditableText';
import { capitalizeFirstLetter } from '../../Services/capitalizeFirstLetter';
import AchievementsSection from './AchievementsSection';
import { ChatGptImproveContext } from '../../Services/api';

interface ExperiencesSectionProps {
    experiences: ExperienceRecommendations;
    onTextChange: (key: string, newValue: string) => void;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences, onTextChange }) => {
    const [histories, setHistories] = useState<{ [key: string]: { undo: string[], redo: string[] } }>({});
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    const handleImproveWithAI = async (index: number) => {
        try {
            setLoading((prevState) => ({ ...prevState, [`description-${index}`]: true }));

            const description = experiences.newExperiences[index].experience.description.length === 0 ? 
                `${experiences.newExperiences[index].experience.title} at ${experiences.newExperiences[index].experience.companyName}` : experiences.newExperiences[index].experience.description;

            const response = await ChatGptImproveContext(description);

            saveStateToHistory(index, experiences.newExperiences[index].experience.description);
            clearRedoHistory(index);
            onTextChange(`description-${index}`, response);
        } catch (error) {
            console.error("Error improving experience", error);
        } finally {
            setLoading((prevState) => ({ ...prevState, [`description-${index}`]: false }));
        }
    };

    const saveStateToHistory = (index: number, state: string) => {
        setHistories((prevHistories) => {
            const key = `description-${index}`;
            const newUndoHistory = [...(prevHistories[key]?.undo || []), state];
            return { ...prevHistories, [key]: { undo: newUndoHistory, redo: [] } };
        });
    };

    const clearRedoHistory = (index: number) => {
        setHistories((prevHistories) => {
            const key = `description-${index}`;
            return { ...prevHistories, [key]: { ...prevHistories[key], redo: [] } };
        });
    };

    const handleUndo = (index: number) => {
        const key = `description-${index}`;
        if (histories[key]?.undo.length > 0) {
            const previousState = histories[key].undo.pop();
            setHistories((prevHistories) => {
                const newRedoHistory = [experiences.newExperiences[index].experience.description, ...(prevHistories[key]?.redo || [])];
                return { ...prevHistories, [key]: { undo: histories[key].undo, redo: newRedoHistory } };
            });
            onTextChange(key, previousState as string);
        }
    };

    const handleRedo = (index: number) => {
        const key = `description-${index}`;
        if (histories[key]?.redo.length > 0) {
            const nextState = histories[key].redo.shift();
            setHistories((prevHistories) => {
                const newUndoHistory = [...(prevHistories[key]?.undo || []), experiences.newExperiences[index].experience.description];
                return { ...prevHistories, [key]: { undo: newUndoHistory, redo: histories[key].redo } };
            });
            onTextChange(key, nextState as string);
        }
    };

    const handleChange = (index: number, newValue: string) => {
        saveStateToHistory(index, experiences.newExperiences[index].experience.description);
        clearRedoHistory(index);
        onTextChange(`description-${index}`, newValue);
    };

    return (
        <section>
            <h3>Experiences</h3>
            {experiences.newExperiences.map((experience, index) => (
                <div key={index}>
                    <h4>{experience.experience.companyName}</h4>
                    <h5>{experience.experience.title}</h5>
                    <p>
                        <EditableText
                            value={experience.experience.description}
                            onChange={(newValue) => handleChange(index, newValue)}
                            isTextarea
                        />
                        <button
                            className="aiImproveButton"
                            onClick={() => handleImproveWithAI(index)}
                            disabled={loading[`description-${index}`]}
                        >
                            {loading[`description-${index}`] ? 'Loading...' : 'Improve With AI'}
                        </button>
                        <button
                            className="undoButton"
                            onClick={() => handleUndo(index)}
                            disabled={!histories[`description-${index}`]?.undo.length}
                        >
                            Undo
                        </button>
                        <button
                            className="redoButton"
                            onClick={() => handleRedo(index)}
                            disabled={!histories[`description-${index}`]?.redo.length}
                        >
                            Redo
                        </button>
                    </p>
                    {experience.recommendations.length > 0 && <h4><strong>Recommendations:</strong></h4>}
                    <ul>
                        {experience.recommendations.map((rec, recIndex) => (
                            <li key={recIndex}>{rec}</li>
                        ))}
                    </ul>
                    <h4><strong>Technologies</strong></h4>
                    <p>
                        {experience.technologies.map((tech) => (`${capitalizeFirstLetter(tech.name)}, `).replace("undefined, ", ""))}
                    </p>
                    {experience.achievements?.achievements && <h4><strong>Achievements:</strong></h4>}
                    <AchievementsSection achievements={experience.achievements} experienceIndex={index} onTextChange={onTextChange} />
                    <div className="divisionBar"></div>
                </div>
            ))}
        </section>
    );
};

export default ExperiencesSection;
