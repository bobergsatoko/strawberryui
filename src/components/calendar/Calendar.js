import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import decoratedWonkyStrawberryBg from './wonky-strawberry.png';
import SecondaryButton from '../buttons/SecondaryButton';
import { ArrowLeft, ArrowRight } from '../buttons/SecondaryButtonUtils';
import { useEffect } from 'react';


/**
 * CSS part
 */
const WidgetContainer = styled.div`
    position: relative;
    background: ${({ theme }) => theme === 'dark' ?
        `linear-gradient(221.07deg, #206D8E 5.96%, #0E405C 17.32%, #092F4A 27.37%, #04283C 36.3%, #012336 47.7%, #022539 56.93%, #052E44 74.64%, #0F414B 83.98%, #257091 95.67%)` :
        `linear-gradient(176.26deg, rgba(224, 242, 249, 0.5) 8.15%, rgba(199, 229, 249, 0.5) 29.44%), linear-gradient(221.07deg, #F9FDFF 5.96%, #BEDEEB 17.32%, #A9CCDA 27.37%, #7EAEC0 36.3%, #80ADBE 47.7%, #7CA3B3 56.93%, #8CB3C1 74.64%, #93C2CC 83.98%, #82AFC2 95.67%);
`};
    border: 1px solid ${({ theme }) => theme === 'dark' ? `rgba(47, 122, 122, 1)` : `rgba(141, 207, 207, 1)`};
    border-radius: 30px;
    width: 350px;
    height: 380px;
    padding: 35px 35px 5px 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-weight: ${({ theme }) => theme === 'dark' ? `300` : `400`};

    color: ${({ theme }) => theme === 'dark' ? 'white' : '#126065'};

    ${({ theme }) => theme === 'dark' ? `&::after {
        position: absolute;
        content: '';
        top: -1px;
        left: 0;
        right: 0;
        bottom: 0;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        background: linear-gradient(176.26deg, rgba(47, 141, 170, 0.5) 8.15%, rgba(11, 40, 66, 0) 29.44%);
    }` : ``};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  z-index: 2;
  align-items: center;
`;

const MonthYear = styled.div`
  font-size: 21px;
  margin-left: 5px;
`;

const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  z-index: 2;
`;

const DayOfMonth = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;
    margin: 2px 0;
    z-index: 2;
    cursor: pointer;

    ${({ active, theme }) => active ? `
        border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(18, 96, 101, 1)'};
        border-radius: 50%;
    ` : 'border: 1px solid transparent;'};

    &:focus-visible {
        outline: none;
        border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(18, 96, 101, 1)'};
        border-radius: 50%;
    }
`;

const StyledWeekContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DecoratingLine = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(72, 130, 148, 1);
    margin: 20px 0;
`;

const StyledDaysOfWeek = styled.div`
    width: 26px;
    text-align: center;
`;

const DecoratedWonkyStrawberryBg = styled.img`
    position: absolute;
    top: -1px;
    left: 50%;
    margin-left: -80px;
    opacity: ${({ theme }) => theme === 'dark' ? 0.75 : 0.45};
    z-index: 1;
`;

const StyledButtonsWrapper = styled.div`
    display: flex;
`;

const Calendar = ({ selectedDate, onDateChange = () => { }, theme = 'dark' }) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

    // Focus states
    const [focusDay, setFocusDay] = useState(null);
    const [focusButton, setFocusButton] = useState(null);

    // Refs
    const daysRef = useRef([]);
    const buttonsRef = useRef([]);

    useEffect(() => {
        // Autofocus on the current day when component is focused
        if (daysRef.current[currentDate.getDate() - 1]) {
            daysRef.current[currentDate.getDate() - 1].focus();
            setFocusDay(currentDate.getDate() - 1);
        }
    }, []);

    const handleKeyDown = (e) => {
        const isButtonFocused = buttonsRef.current.some(ref => {
            return ref === document.activeElement;
        });
    
        if (e.key === "ArrowLeft") {
            if (isButtonFocused && focusButton !== null) {
                setFocusButton((prevFocus) => Math.max(prevFocus - 1, 0));
            } else if (focusDay !== null && focusDay > 0) { // Add check for focusDay > 0
                setFocusDay((prevFocus) => {
                    const nextFocus = Math.max(prevFocus - 1, 0);
                    return daysRef.current[nextFocus] ? nextFocus : prevFocus; // Only change focus if next focusable day exists
                });
            }
        } else if (e.key === "ArrowRight") {
            if (isButtonFocused && focusButton !== null) {
                setFocusButton((prevFocus) => Math.min(prevFocus + 1, buttonsRef.current.length - 1));
            } else if (focusDay !== null && focusDay < daysRef.current.length - 1) { // Add check for focusDay < daysRef.current.length - 1
                setFocusDay((prevFocus) => {
                    const nextFocus = Math.min(prevFocus + 1, daysRef.current.length - 1);
                    return daysRef.current[nextFocus] ? nextFocus : prevFocus; // Only change focus if next focusable day exists
                });
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                setFocusDay(null);
                setFocusButton(0);
            } else {
                setFocusButton(null);
                setFocusDay(0);
            }
        } else if (e.key === "Enter" && focusDay !== null) {
            const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), focusDay + 1);
            setCurrentDate(selectedDay);
            onDateChange(selectedDay);
        }
    };

    useEffect(() => {
        if (focusDay !== null && daysRef.current[focusDay]) {
            daysRef.current[focusDay].focus();
        } else if (focusButton !== null && buttonsRef.current[focusButton]) {
            buttonsRef.current[focusButton].focus();
        }
    }, [focusDay, focusButton]);

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            return prevMonthDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            onDateChange(nextMonthDate);
            return nextMonthDate;
        });
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    const daysOfMonth = [];

    for (let i = 1; i <= daysInMonth; i++) {
        daysOfMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const emptyDays = [];

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        emptyDays.push(i);
    }

    const weeksOfMonth = [];

    let currentWeek = [];

    emptyDays.forEach(() => {
        currentWeek.push(null);
    });

    daysOfMonth.forEach((day) => {
        currentWeek.push(day);

        if (currentWeek.length === 7) {
            weeksOfMonth.push(currentWeek);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }

        weeksOfMonth.push(currentWeek);
    }

    return (
        <WidgetContainer theme={theme} onKeyDown={handleKeyDown}>
            <DecoratedWonkyStrawberryBg theme={theme} src={decoratedWonkyStrawberryBg} />
            <Header>
                <MonthYear>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</MonthYear>
                <StyledButtonsWrapper>
                    <SecondaryButton theme={theme} icon={<ArrowLeft theme={theme} />} onClick={handlePrevMonth} ref={el => buttonsRef.current[0] = el}
                        tabIndex={0} />
                    <div style={{
                        marginLeft: 8
                    }}>
                        <SecondaryButton theme={theme} icon={<ArrowRight theme={theme} />} onClick={handleNextMonth} ref={el => buttonsRef.current[1] = el}
                            tabIndex={0} />
                    </div>
                </StyledButtonsWrapper>
            </Header>
            <DaysOfWeek>
                {daysOfWeek.map((day) => (
                    <StyledDaysOfWeek key={day}>{day}</StyledDaysOfWeek>
                ))}
            </DaysOfWeek>
            {weeksOfMonth.map((week, i) => (
                <StyledWeekContainer key={i}>
                    {week.map((day, j) => (
                        <DayOfMonth
                            key={day ? day.getDate() : Math.random()}
                            active={day && day.getDate() === currentDate.getDate()}
                            theme={theme}
                            onClick={() => {
                                if (day) {
                                    setCurrentDate(day);
                                    onDateChange(day);
                                }
                            }}
                            style={{ opacity: day ? 1 : 0.4, pointerEvents: day ? "auto" : "none" }}
                            tabIndex={day ? 0 : -1}  // Only allow focus if the day is not null
                            ref={el => {
                                if (day) {
                                    daysRef.current[i * 7 + j - emptyDays.length] = el
                                }
                            }}  // Only assign a ref if the day is not null
                        >
                            {day ? day.getDate() : ""}
                        </DayOfMonth>
                    ))}
                </StyledWeekContainer>
            ))}
            <DecoratingLine />
        </WidgetContainer>
    );
};

export default Calendar;
