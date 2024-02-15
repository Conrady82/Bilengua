import React from 'react';

interface TranslationOutputProps {
    translatedText: string;
}

const TranslationOutput: React.FC<TranslationOutputProps> = ({ translatedText }) => {
    return (
        <div className="translationOutput">
            <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here"
            />
        </div>
    );
};

export default TranslationOutput;
