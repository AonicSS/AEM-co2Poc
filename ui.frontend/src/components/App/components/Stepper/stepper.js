import React from 'react'
import InfoModal from '../Modal/modal'

import { BackButton } from '../Button/button'
import './style.css'

const StepperNav = ({ currentState }) => {
    return (
        <div className='stepper-nav d-flex mt-5 mb-5'>
            <StepperNavItem addActive={currentState > 0 ? 'nav-active' : ''}></StepperNavItem>
            <StepperNavItem addActive={currentState > 1 ? 'nav-active' : ''}></StepperNavItem>
            <StepperNavItem addActive={currentState > 2 ? 'nav-active' : ''}></StepperNavItem>
        </div>
    )
}

const StepperNavItem = ({ addActive }) => {
    return (
        <hr className={`stepper-nav-item ${addActive}`}></hr>
    )
}

const StepperText = ({ currentState }) => {
    const stepText = ['Mit welcher Energiequelle wird geheizt?',
        'Wie hoch ist der jährliche Brennstoffverbrauch',
        'Wie groß ist die Grundfläche aller Wohnräume?']
    const currentText = stepText[currentState]
    return (
        <div className='stepper-text'>{currentText}</div>
    )
}


const Stepper = (props) => {
    return (
        <>
            <StepperNav currentState={props.currentState}></StepperNav>
            {props.currentState < 3 ? (<div className='stepper-header d-flex mb-5'>
                {props.currentState > 0
                    ? (<BackButton
                        currentState={props.currentState}
                        setCurrentState={props.setCurrentState}
                        setCanContinue={props.setCanContinue} />)
                    : ''}
                <StepperText currentState={props.currentState}></StepperText>
                <InfoModal currentState={props.currentState}></InfoModal>
            </div>) : ''}
        </>
    )
}

export default Stepper