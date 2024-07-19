import React from 'react';
import EditableText from '../EditableText';
import { HeadlineRecommendations } from '../../Domain/ResumeImprovementType';

interface HeadlineSectionProps {
    headline: HeadlineRecommendations;
    onTextChange: (key: string, newValue: string) => void;
}

const HeadlineSection: React.FC<HeadlineSectionProps> = ({ headline, onTextChange }) => {
    return (
        <section>
            <h3>Headline</h3>
            <p><strong>Old Headline:</strong> {headline.oldHeadLine}</p>
            <p>
                <strong>New Headline:</strong>
                <EditableText
                    value={headline.newHeadLine}
                    onChange={(newValue) => onTextChange('newHeadLine', newValue)}
                    isTextarea
                />
            </p>
            <h4>Suggested Headlines</h4>
            <ul>
                {headline.suggestedHeadLines.map((headline, index) => (
                    <li key={index}>{headline}</li>
                ))}
            </ul>
            <h4>Recommendations</h4>
            <ul>
                {headline.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
        </section>
    );
};

export default HeadlineSection;
