import React, {useEffect, useState} from 'react';
import styles from './dropdown.module.css'

const Dropdown = ({array, startValue, fieldName, callback}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(startValue !== null ? startValue.content : "Choose");
    const [selectedOptionStyle, setSelectedStyle] = useState(startValue !== null ? startValue.style : "");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.content);
        setSelectedStyle(option.style);
        callback(fieldName, option.content);
        setIsOpen(false);
    };

    const parseStyleString = (styleString) => {
        return styleString.split(';').reduce((acc, style) => {
            const [key, value] = style.split(':').map(item => item.trim());
            if (key && value) {

                const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
                acc[camelCaseKey] = value;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
            setSelectedOption(startValue !== null ? startValue.content : "Choose");
            setSelectedStyle(startValue !== null ? startValue.style : "");
    }, [startValue])

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdown__toggle} onClick={toggleDropdown} style={parseStyleString(selectedOptionStyle)}>
                {selectedOption}
            </button>
            {isOpen && (
                <div className={styles.dropdown__menu}>
                    {array.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={[styles.dropdown__item, selectedOption === option.content ? 'selected' : ''].join(' ')}
                            style={parseStyleString(option.style)}
                        >
                            {option.content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
