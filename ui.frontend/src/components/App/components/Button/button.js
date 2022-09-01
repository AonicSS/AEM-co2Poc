import React from "react"
import { Button } from "react-bootstrap"
import "./style.css"
import IconBack from '../../assets/icons/IconBack.svg'
// import { jsPDF } from "jspdf"
// import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'



const handleNext = (props) => () => {
    if (props.currentState === 5) {
        const report = document.getElementById('report-content')
        const chartSection = document.getElementById('chart-section')
        const barCanvas = document.getElementById('bar-canvas')
        report.setAttribute('style', 'padding:0px !important')
        barCanvas.getElementsByTagName('canvas')[0].setAttribute('style', 'width: 565px')
        chartSection.append(report)
        const input = document.getElementById('pdf-section')
        input.style.display = 'block'
        var opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // html2pdf().set(opt).from(input).save();
        html2pdf().set(opt).from(input).outputPdf('blob').then((result) => {
            console.log(result)
            var fileURL = window.URL.createObjectURL(result);
            let tab = window.open();
            tab.location.href = fileURL;
            window.location.reload()
        });
        return
    }
    props.setCurrentState(props.currentState + 1)
    props.setCanContinue(false)
}

const handlePrevious = (props) => () => {
    props.setCurrentState(props.currentState - 1)
    props.setCanContinue(false)
}

const ContinueButton = (props) => {
    let BtnName, customClass
    if (props.currentState === 3) {
        BtnName = 'Jetzt Prognose anzeigen'
    } else if (props.currentState === 4) {
        customClass = 'move-top'
        BtnName = 'Jetzt Kosten reduzieren'
    } else if (props.currentState === 5) {
        BtnName = 'Mehr zum HeizungsCheck'
    }
    else {
        BtnName = 'Weiter'
    }
    return (
        <>
            {props.canContinue
                ? (<Button variant="continue" className={`rounded-pill ${customClass ? customClass : ''}`} onClick={handleNext(props)}>{BtnName}</Button>)
                : (<Button variant="continue" className="rounded-pill" disabled>{BtnName}</Button>)}
        </>
    )
}

const BackButton = (props) => {
    return (
        props.currentState > 4
            ? ('') :
            (<button className={`btn-back univers-bold ${props.currentState === 4 ? 'grey-box-alt' : ''}`}
                onClick={handlePrevious(props)}>
                <img className={props.currentState < 3 ? ('btn-back-offset') : ('')} src={IconBack} alt='back-icon' />
                {props.currentState === 4 ? 'Zurück' : ''}
            </button>)

    )
}

export { ContinueButton, BackButton }