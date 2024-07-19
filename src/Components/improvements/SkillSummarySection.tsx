import React from 'react';
import { SkillSummaryRecommendations } from '../../Domain/ResumeImprovementType';
import { Technology, TechnologyTag } from '../../Domain/ResumeType';

interface SkillSummarySectionProps {
    skillSummary: SkillSummaryRecommendations;
    onTextChange: (key: string, newValue: string) => void;
}

const SkillSummarySection: React.FC<SkillSummarySectionProps> = ({ skillSummary }) => {
    const groupByTag = (technologies: Technology[]) => {
        return technologies.reduce((acc, tech) => {
            if (!acc[tech.tag]) {
                acc[tech.tag] = [];
            }
            acc[tech.tag].push(tech);
            return acc;
        }, {} as Record<number, Technology[]>);
    };

    const groupedTechnologies = groupByTag(skillSummary.technologies);

    const getTagName = (tag: TechnologyTag) => {
        return TechnologyTag[tag];
    };

    return (
        <section>
            <h3>Skill Summary</h3>
            <h4>Recommendations</h4>
            <ul>
                {skillSummary.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
            <h4>Technologies</h4>
            <div className='skillSummarySection'>
                {Object.keys(groupedTechnologies).map((tag, index) => (
                    <div key={index}>
                        <h5>{getTagName(Number(tag))}</h5>
                        <ul>
                            {groupedTechnologies[Number(tag)].map((tech) => (
                                <li key={tech.id}>{tech.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillSummarySection;
