// TranslationInput.tsx
import React, { useState } from 'react';
import TranslateButton from './TranslateButton';

interface TranslationInputProps {
    onTranslate: (text: string) => void; // Function to call for text translation
}

const TranslationInput: React.FC<TranslationInputProps> = ({ onTranslate }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const handleTranslateClick = () => {
        onTranslate(inputText);
    };

    return (
        <div className="translationInput">
            <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text to translate"
            />
            <TranslateButton onTranslate={handleTranslateClick} />
        </div>
    );
};

export default TranslationInput;
