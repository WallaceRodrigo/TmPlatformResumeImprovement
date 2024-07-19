import React from 'react';
import { EducationRecommendations } from '../../Domain/ResumeImprovementType';

interface EducationSectionProps {
    educations: EducationRecommendations;
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
    return (
        <section>
            <h3>Education</h3>
            {educations.newEducation.map((education, index) => (
                <div key={index}>
                    <p><strong>School:</strong> {education.education.school}</p>
                    <p><strong>Degree:</strong> {education.education.degree}</p>
                    <p><strong>Field of Study:</strong> {education.education.fieldOfStudy}</p>
                    {education.recommendations.length > 0 && <h4><strong>Recommendations:</strong></h4>}
                    <ul>
                        {education.recommendations.map((rec, recIndex) => (
                            <li key={recIndex}>{rec}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default EducationSection;
