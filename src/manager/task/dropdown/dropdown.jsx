import React, {useEffect, useRef, useState} from 'react';
import styles from './dropdown.module.css'
import {options} from "axios";

const Dropdown = ({addFunc, array, startValue, fieldName, callback}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(startValue !== null ? startValue.content.title : "Choose");
    const [selectedOptionStyle, setSelectedStyle] = useState(startValue !== null ? startValue.content.color : "");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.content.title);
        setSelectedStyle(option.content.color);

        if(callback.length === 1){
            callback(option.content.title);
        } else if (callback.length === 2){
            if(fieldName === "assignee"){
                option.content.title = option.id
                console.log("ASIGNEE")
                callback(fieldName + "_id", option.content);
                return;
            }
            callback(fieldName, option.content);
        }
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
            setSelectedOption(startValue !== null ? startValue.content.title : "Choose");
            setSelectedStyle(startValue !== null ? startValue.content.color : "");
    }, [startValue])

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef} onClick={(e)=>e.stopPropagation()}>
            <button className={styles.dropdown__toggle} onClick={toggleDropdown} style={parseStyleString(selectedOptionStyle)}>
                {selectedOption}
            </button>
            {isOpen && (
                <div className={styles.dropdown__menu}>
                    <div className={styles.dropdown__item} onClick={() => {
                        setIsOpen(false);
                        addFunc()
                    }}>+</div>
                    {array.map((option, index) => {
                        return (

                        <div style={parseStyleString(option.content.color)}
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={[styles.dropdown__item, selectedOption === option.content.color ? 'selected' : ''].join(' ')}


                        >
                            {option.content.title}
                        </div>
                    )})}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
