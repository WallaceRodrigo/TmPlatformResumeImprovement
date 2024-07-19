import { useEffect, useState } from "react";
import { useResume } from "../Services/ResumeContext";
import { GetResume, ImproveResme } from "../Services/api";
import { ImproveResumeResponse } from "../Domain/ResumeImprovementType";
import "./ImprovedResumeDisplay.css";
import HeadlineSection from "./improvements/HeadlineSection";
import AboutMeSection from "./improvements/AboutMeSection";
import ExperiencesSection from "./improvements/ExperiencesSection";
import EducationSection from "./improvements/EducationsSection";
import SkillSummarySection from "./improvements/SkillSummarySection";
import ResumePreview from "./ResumePreview";

const ResumeImprovement = () => {
    const { resume, setResume } = useResume();
    const [improvedResume, setImprovedResume] = useState<ImproveResumeResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resumeId, setResumeId] = useState<string>("");

    useEffect(() => {
        const savedImprovedResume = localStorage.getItem('improvedResume');
        if (savedImprovedResume) {
            const improvedResume = JSON.parse(savedImprovedResume);

            setResume(improvedResume.resume)
            return setImprovedResume(improvedResume);
        }
    }, []);

    useEffect(() => {
        if (improvedResume) {
            localStorage.setItem('improvedResume', JSON.stringify(improvedResume));
        }
    }, [improvedResume]);

    const handleFetchResume = async (e: React.FormEvent) => {
        e.preventDefault();
        try  {
            setLoading(true);
            const accountResume = await GetResume(resumeId);
            setResume(accountResume);

            setLoading(false);
        } catch (error) {
            console.error("Erro ao pegar o currículo", error);
            setLoading(false);
        }
    };

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await ImproveResme(resume);
            
            setImprovedResume(response);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao melhorar o currículo", error);
            setLoading(false);
        }
    };

    const handleTextChange = (section: string, key: string, newValue: string) => {
        setImprovedResume(prevState => {
            if (prevState) {
                const updatedState = { ...prevState };
                if (section === 'headline') {
                    (updatedState.headline as any)[key] = newValue;
                } else if (section === 'aboutMe') {
                    (updatedState.aboutMe as any)[key] = newValue;
                } else if (section === 'experience') {
                    const [subSection, index, subKey] = key.split('-');
                    if (subSection === 'achievements') {
                        (updatedState.experiences.newExperiences[parseInt(index)].achievements.achievements as any)[subKey].fullDescription = newValue;
                    } else {
                        updatedState.experiences.newExperiences[parseInt(index)].experience.description = newValue;
                    }
                }

                return updatedState;
            }
            return prevState;
        });
    }

    const handleResumeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResumeId(e.target.value);
    };

    return (
        <>
            {resume ? (
                <div className="resumeImprovementContainer">
                    <div className="improveContainer">
                        <h2>Resume: {resume.name}</h2>
                        <button className="improveButton" onClick={handleClick}>Melhorar</button>
                        {loading && <p className="loading">Carregando...</p>}
                        {improvedResume && !loading && (
                            <div className="improved-resume">
                                <h2>Improved Resume</h2>
                                <HeadlineSection headline={improvedResume.headline} onTextChange={(key, newValue) => handleTextChange('headline', key, newValue)} />
                                <AboutMeSection aboutMe={improvedResume.aboutMe} onTextChange={(key, newValue) => handleTextChange('aboutMe', key, newValue)} />
                                <SkillSummarySection skillSummary={improvedResume.skillSummary} onTextChange={(key, newValue) => handleTextChange('skillSummary', key, newValue)}/>
                                <ExperiencesSection experiences={improvedResume.experiences} onTextChange={(key, newValue) => handleTextChange('experience', key, newValue)} />
                                <EducationSection educations={improvedResume.educations} />
                            </div>
                        )}
                    </div>
                    {
                        resume && improvedResume && (
                            <ResumePreview improvedResume={improvedResume as ImproveResumeResponse}/>
                        )
                    }
                </div>
            ) : 
            <div className="resumeIdInputContainer">
                <label htmlFor="resumeId">Resume ID:</label>
                <input
                    type="number"
                    id="resumeId"
                    value={resumeId}
                    onChange={handleResumeIdChange}
                />
                <button className="fetchResumeButton" onClick={(e) => resumeId && handleFetchResume(e)}>{loading? "Loading..." : "Fetch Resume"}</button>
            </div>
            }
        </>
    );
}

export default ResumeImprovement;
