import React, { useState } from 'react';
import TranslationInput from './TranslationInput';
import TranslationOutput from './TranslationOutput';

const Body: React.FC = () => {
    const [translation, setTranslation] = useState('');

    const translateText = (text: string) => {
        // Calls our translation API
        setTranslation(text.toUpperCase());     // For now, we just simulate translation by converting text to uppercase
    };

    return (
        <div className="bodyContainer">
            <TranslationInput onTranslate={translateText} />
            <TranslationOutput translatedText={translation} />
        </div>
    );
};

export default Body;