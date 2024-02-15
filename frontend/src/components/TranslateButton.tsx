import React from 'react';

interface TranslateButtonProps {
    onTranslate: () => void; // Function to call when the button is pressed
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ onTranslate }) => {
    return (
        <button onClick={onTranslate} className="translateButton">
            Translate
        </button>
    );
};

export default TranslateButton;
