import React from 'react';
import { ImproveResumeResponse } from '../Domain/ResumeImprovementType';
import "./ResumePreview.css";
import { Technology, TechnologyTag } from '../Domain/ResumeType';
import { capitalizeFirstLetter } from '../Services/capitalizeFirstLetter';

interface ResumePreviewProps {
    improvedResume: ImproveResumeResponse;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ improvedResume }) => {
    const groupByTag = (technologies: Technology[]) => {
        return technologies.reduce((acc, tech) => {
            if (!acc[tech.tag]) {
                acc[tech.tag] = [];
            }
            acc[tech.tag].push(tech);
            return acc;
        }, {} as Record<number, Technology[]>);
    };

    const groupedTechnologies = groupByTag(improvedResume.skillSummary?.technologies);

    const getTagName = (tag: TechnologyTag) => {
        return TechnologyTag[tag];
    };

    return (
        <div className="resumePreviewContainer">
            <div className="header">
                <h1>{improvedResume.resume?.name}</h1>
                <h5>{improvedResume?.headline.newHeadLine}</h5>
                <div>
                    <div className="left-group">
                        <p>LinkedIn: {improvedResume.resume?.linkedinUrl}</p>
                        <p>GitHub: {"github.com/githubLink"}</p>
                    </div>
                    <div className="right-group">
                        <p>Email: {improvedResume.resume?.email}</p>
                        <p>Mobile: {"+55-12-33456353"}</p>
                    </div>
                </div>
            </div>
            {
                improvedResume?.aboutMe.description.length != 0 && (
                    <div className="section">
                        <h2>Profile</h2>
                        <p>{improvedResume?.aboutMe.description}</p>
                    </div>
                )
            }
            <div className="section">
                <h2>Skills Summary</h2>
                {Object.keys(groupedTechnologies).map((tag, index) => (
                    <li key={index}>
                        <strong>{getTagName(Number(tag))}:</strong> {groupedTechnologies[Number(tag)].map((tech) => (capitalizeFirstLetter(tech.name) + ", "))}
                    </li>
                ))}
            </div>
            <div className="section">
                <h2>Experience</h2>
                {improvedResume.experiences?.newExperiences.map((job, index) => (
                    <div key={index}>
                        <ul>
                            <li><strong>{job.experience.companyName.length === 0 ? "Experience" : job.experience.companyName}</strong>
                                <div id='ExperienceSectionNameAndLocationDiv'>
                                    <p>{job.experience.title}</p>
                                    <p>{job.experience.location.locationName} {job.experience.locationType}</p>
                                </div>
                                <ul>
                                    {job.achievements?.achievements.map((resp, idx) => (
                                        <li key={idx}>{resp.fullDescription}</li>
                                    ))}
                                </ul>
                                {
                                    job.experience.description.length != 0 && (
                                        <p><strong>Context:</strong> {job.experience.description}</p>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2>Education</h2>
                {
                    improvedResume.educations?.newEducation.map((education, index) => (
                        <div key={index}>
                            <p>
                                <strong>{education?.education.school}</strong> {education?.education.degree}{" "}
                                {education?.education.fieldOfStudy}
                            </p>
                            {/* <p>
                  {education.location.locationName} {education.date}
                </p> */}
                        </div>
                    ))
                }
            </div>
        {/* <div className="section">
            <h2>PROJECTS</h2>
            {resume.projects.map((project, index) => (
                <div key={index}>
                <p>
                    <strong>{project.name}</strong>: {project.description} Link:{" "}
                    <a href={project.link}>{project.link}</a>
                </p>
                </div>
            ))}
            </div> */}
        </div>
    );
};

export default ResumePreview;