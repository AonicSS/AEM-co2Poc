import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Validator from 'validator'
import { ButtonGroup, Form, Stack, Row, Col } from 'react-bootstrap'
import InfoModal from '../Modal/modal'

import { BackButton } from '../Button/button'
import './style.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { ContinueButton } from '../Button/button'

import IconFlussiggas from '../../assets/icons/IconFlussiggas.svg'
import IconErdgas from '../../assets/icons/IconErdgas.svg'
import IconHeizol from '../../assets/icons/IconHeizol.svg'
import IconHouse from '../../assets/icons/IconHouse.svg'
import IconCloud from '../../assets/icons/IconCloud.svg'
import ImageEmail from '../../assets/images/EmailScreen.png'
import IconEmail from '../../assets/images/EmailRedCircle.svg'
import IconHeizungsCheck from '../../assets/icons/IconHeizungsCheck.svg'
import IconHeizungsActive from '../../assets/icons/IconHeizungsActive.svg'

const Selection = (props) => {
    return (
        <div className='choice-item'>
            <img src={props.imageUrl} alt={props.name} />
            <p className='choice-text mt-2'>{props.name}</p>
            <input type='radio'
                name='choice-item'
                id={`choice-${props.name}`}
                data-id={props.dataId}
                onChange={props.changeHandler}>
            </input>
        </div>
    )
}

const InitSelection = ({ props }) => {

    const handleRadioChange = () => (event) => {
        const selectedOption = event.target.getAttribute('data-id')
        props.setCurrentSelected(parseInt(selectedOption))
        props.setCanContinue(true)
    }

    return (
        <div className='choice-container mb-5'>
            <Selection name='Flüssiggas'
                dataId='1'
                imageUrl={IconFlussiggas}
                currentSelected={props.currentSelected}
                changeHandler={handleRadioChange(props)} />
            <Selection name='Erdgas'
                dataId='2'
                imageUrl={IconErdgas}
                currentSelected={props.currentSelected}
                changeHandler={handleRadioChange(props)} />
            <Selection name='Heizöl'
                dataId='3'
                imageUrl={IconHeizol}
                currentSelected={props.currentSelected}
                changeHandler={handleRadioChange(props)} />
        </div>
    )
}

const FirstSelection = ({ props }) => {
    const [SelectedUnit, setSelectedUnit] = useState('L')
    const handleInputChange = () => (event) => {
        props.setConsumption({
            'Unit': SelectedUnit,
            'Value': event.target.value
        })

        if (event.target.value.length > 0) {
            props.setCanContinue(true)
        } else {
            props.setCanContinue(false)
        }
    }

    const handleUnitChange = (event) => {
        setSelectedUnit(event.target.textContent)
    }

    let selectedName, selectedIcon
    let addPadding = false
    if (props.currentSelected === 1 && props.currentState === 1) {
        selectedName = 'Flüssiggas'
        selectedIcon = IconFlussiggas
    } else if (props.currentSelected === 2 && props.currentState === 1) {
        selectedName = 'Erdgas'
        selectedIcon = IconErdgas
        addPadding = true
    } else if (props.currentSelected === 3 && props.currentState === 1) {
        selectedName = 'Heizöl'
        selectedIcon = IconHeizol
    }
    useEffect(() => {
        if (props.currentSelected === 2 && props.currentState === 1) {
            setSelectedUnit('kWh')
        }
    }, [])

    return (
        <div className='d-flex align-items-center mb-5'>
            <Stack direction='horizontal' gap={3}>
                <div className='choice-item'>
                    <img src={selectedIcon} alt='item-icon' />
                    <p className='choice-text mt-2'>{selectedName}</p>
                </div>
                <Form>
                    <Form.Group className='d-flex align-items-center position-relative' controlId="formInput">
                        <Form.Control type="number" placeholder="Wert eintragen" className={`pt-2 ${addPadding ? 'pe-5' : 'pe-4'}`} onChange={handleInputChange(props)} />
                        {selectedName !== 'Erdgas'
                            ? (<span className='unit'>L</span>)
                            : (<ButtonGroup className='unit'>
                                <div className={`unit-item ${SelectedUnit === 'kWh' ? 'active-unit' : ''}`} onClick={handleUnitChange}>kWh</div>
                                <div className={`unit-item ${SelectedUnit === 'm3' ? 'active-unit' : ''}`} onClick={handleUnitChange}>m<sup>3</sup></div>
                            </ButtonGroup>)}
                    </Form.Group>
                </Form>
            </Stack>
        </div>
    )

}

const SecondSelection = ({ props }) => {
    const handleInputChange = () => (event) => {
        props.setTotalArea(event.target.value)
        if (event.target.value.length > 0) {
            props.setCanContinue(true)
        } else {
            props.setCanContinue(false)
        }
    }
    return (
        <div className='d-flex align-items-center mb-5'>
            <Stack direction='horizontal' gap={3}>
                <div className='choice-item'>
                    <img src={IconHouse} alt='item-icon' />
                    <p className='choice-text 2'>Wohnfläche</p>
                </div>
                <Form>
                    <Form.Group className='d-flex align-items-center' controlId="formInput">
                        <Form.Control type="number" placeholder="Wert eintragen" className={`pt-2 pe-4`} onChange={handleInputChange(props)} />
                        <span className='unit unit-meter'>m<sup>2</sup></span>
                    </Form.Group>
                </Form>
            </Stack>
        </div>
    )
}

const ThirdSelection = ({ props }) => {
    const [ValidEmail, setValidEmail] = useState(false)
    const [Consent, setConsent] = useState(false)

    const handleEmailChange = (event) => {
        if (Validator.isEmail(event.target.value)) {
            props.setEmail(event.target.value)
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }

    }

    const handleConsentChange = (event) => {
        if (event.target.checked) {
            setConsent(true)
        } else {
            setConsent(false)
        }
    }

    useEffect(() => {
        if (ValidEmail && Consent) {
            props.setCanContinue(true)
        } else {
            props.setCanContinue(false)
        }
    }, [ValidEmail, Consent])

    const consentText = `Mit dem Absenden dieses Formulars willige ich ein, 
    dass die Techem GmbH, sowie deren Tochtergesellschaften und die mit ihr verbundenen Gesellschaften, 
    die von mir oben eingetragenen Daten zum Zweck der Bearbeitung dieser Anfrage,
     der werblichen Ansprache per E-Mail und der Auswertung zu Marketingzwecken verarbeitet werden.
      Ich bestätige weiter, dass ich zur Überlassung vorgenannter Kontaktdaten berechtigt bin. 
      Diese Einwilligung erfolgt freiwillig und ist mit Wirkung für die Zukunft jederzeit widerrufbar.
       Einzelheiten zum Datenschutz bei der Techem GmbH entnehmen Sie bitte den Datenschutzbestimmungen.`


    return (
        <Row className='d-flex justify-content-between'>
            <Col md={1} className='ps-0 pe-0'>
                <BackButton
                    currentState={props.currentState}
                    setCurrentState={props.setCurrentState}
                    setCanContinue={props.setCanContinue} />
            </Col>
            <Col md={5} className='ps-0'>
                <h3 className='stepper-text text-center mb-5'>
                    Ihre kostenlose CO<sub>2</sub>-Kostenprognose <br /> ist nur einen Klick entfernt
                </h3>
                <p className='mb-5'>
                    Geben Sie einfach Ihre E-Mail-Adresse an und erhalten
                    Sie von uns gebührenfrei Ihre individuelle Prognose sowie wertvolle Energiespartipps!
                </p>
                <Form>
                    <Form.Group controlId="formInput" className='mb-5 col-md-8 d-flex flex-column ms-auto me-auto'>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="E-Mail eintragen" onChange={handleEmailChange} className='mb-5' />
                        <ContinueButton currentSelected={props.currentSelected}
                            setCurrentSelected={props.setCurrentSelected}
                            currentState={props.currentState}
                            setCurrentState={props.setCurrentState}
                            canContinue={props.canContinue}
                            setCanContinue={props.setCanContinue}></ContinueButton>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={consentText} onChange={handleConsentChange} className='consent-text' />
                    </Form.Group>
                </Form>
            </Col>
            <Col md={6} className='ps-4'>
                <div className='email-img-content'>
                    <img className='icon-email' src={IconEmail} alt='email-icon'></img>
                    <img className='image-email' src={ImageEmail} alt='email-img'></img>
                </div>
            </Col>
        </Row>
    )
}

const FourthSelection = ({ props }) => {
    const [fetchedData, setFetchedData] = useState([])
    const [showDiscount, setShowDiscount] = useState(false)
    const InitialPricePerTon = 35

    useEffect(() => {
        props.setCanContinue(true)
    }, [])

    useEffect(() => {
        axios.get('https://techemco2server.azurewebsites.net/')
            .then((response) => {
                setFetchedData(response.data)
            })
    }, [])

    let selectedName, selectedIcon
    if (props.currentSelected === 1) {
        selectedName = 'Flüssiggas'
        selectedIcon = IconFlussiggas
    } else if (props.currentSelected === 2) {
        selectedName = 'Erdgas'
        selectedIcon = IconErdgas
    } else if (props.currentSelected === 3) {
        selectedName = 'Heizöl'
        selectedIcon = IconHeizol
    }

    const TotalEmission = () => {
        switch (selectedName) {
            case 'Erdgas':
                return CalculateTotalEmission(fetchedData.length ? (fetchedData[0].Erdgas.filter(item => item.Unit === props.Consumption.Unit)[0]) : '')
            case 'Flüssiggas':
                return CalculateTotalEmission(fetchedData.length ? (fetchedData[0].Flüssiggas) : '')
            case 'Heizöl':
                return CalculateTotalEmission(fetchedData.length ? (fetchedData[0].Heizöl) : '')
            default:
                return
        }
    }

    const CalculateTotalEmission = (selectedData) => {
        return ((((parseInt(props.Consumption.Value)
            * selectedData.Heizwert) / selectedData.Brennwert)
            * selectedData.EmissionFactor) / 1000)
    }

    const CalculateShare = () => {
        const perMeterEmission = TotalEmission() / props.TotalArea
        switch (true) {
            case (perMeterEmission < 12):

                return 0
            case (12 < perMeterEmission && perMeterEmission < 17):

                return 10
            case (17 < perMeterEmission && perMeterEmission < 22):

                return 20
            case (22 < perMeterEmission && perMeterEmission < 27):

                return 30
            case (27 < perMeterEmission && perMeterEmission < 32):

                return 40
            case 32 < perMeterEmission && perMeterEmission < 37:

                return 50
            case 37 < perMeterEmission && perMeterEmission < 42:

                return 60
            case 42 < perMeterEmission && perMeterEmission < 47:

                return 70
            case 47 < perMeterEmission && perMeterEmission < 52:

                return 80
            case perMeterEmission >= 52:

                return 90
            default:
                return 0
        }
    }

    const showDiscountChart = () => {
        setShowDiscount(!showDiscount)
    }

    const CalculateYearlyCost = (data) => {
        const sum = data.reduce((partial, current) => {
            return parseFloat(partial) + parseFloat(current)
        }, [0])
        return parseFloat(sum).toFixed(2)
    }


    const labels = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032']

    const dataFillMietende = labels.map((item, index) => {
        if (index === 0) {
            return parseFloat(TotalEmission() / 1000 * InitialPricePerTon).toFixed(2)
        } else if (index === 1) {
            return parseFloat(TotalEmission() / 1000 * (InitialPricePerTon + 10)).toFixed(2)
        } else {
            return parseFloat(TotalEmission() / 1000 * (InitialPricePerTon + 20)).toFixed(2)
        }
    })

    const dataFillVermietende = dataFillMietende.map((item) => parseFloat((item * (CalculateShare() / 100))).toFixed(2))

    const dataDiscountMietende = dataFillMietende.map((item) => parseFloat(item - (item * 0.08)).toFixed(2))

    const dataDiscountVermietende = dataDiscountMietende.map((item) => parseFloat((item * (CalculateShare() / 100))).toFixed(2))


    // add dotted line and label above line for tenant chart
    const floatingLabels = {
        id: 'floatingLabels',
        afterDatasetsDraw(chart) {
            let datasetToSelect = 1
            if (chart.$datalabels._datasets.length === 3) {
                datasetToSelect = 2
            }
            const { ctx, chartArea: { left }, scales: { x } } = chart
            for (let i = 0; i < chart.getDatasetMeta(datasetToSelect).data.length; i++) {
                // if (i > 1 && (chart.getDatasetMeta(datasetToSelect).data[i].$context.raw === chart.getDatasetMeta(datasetToSelect).data[i - 1].$context.raw)) {
                //     break
                // }

                // show first second and last
                if (i > 1 && i < chart.getDatasetMeta(datasetToSelect).data.length - 1) {
                    continue
                }
                const xPostion = left - 40
                const yPostion = chart.getDatasetMeta(datasetToSelect).data[i].y

                ctx.save()
                ctx.strokeStyle = 'rgba(0, 155, 180, 1)'
                ctx.setLineDash([2, 5])
                ctx.lineWidth = "2"
                ctx.beginPath()
                ctx.moveTo(x.getPixelForValue(i) + ((x.getPixelForValue(i + 1) - x.getPixelForValue(i)) / 2 - 6), yPostion);
                ctx.lineTo(xPostion, yPostion);
                ctx.stroke();
                ctx.fillText(chart.getDatasetMeta(datasetToSelect).data[i].$context.raw + " €", xPostion, yPostion - 10)
            }
        }
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        ChartDataLabels,
        floatingLabels
    )

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'CO2 Chart',
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    padding: 30,
                    font: {
                        weight: 'bold',
                    }
                }
            },
            y: {
                display: false,
                stacked: false,
                grid: {
                    drawOnChartArea: false
                },

            },
        },
        layout: {
            padding: {
                top: 20,
                left: 50
            }
        }
    }

    // based on state add discound dataset
    let dataset
    if (props.currentState === 5 && showDiscount) {
        dataset = [
            {
                label: 'Discount',
                data: dataDiscountVermietende,
                backgroundColor: 'rgba(226, 6, 19, 1)',
                datalabels: {
                    color: 'white',
                    anchor: 'end',
                    align: 'bottom',
                    font: {
                        family: 'Univers B'
                    },
                    display: 'true',
                    formatter: (value) => { return value + ' €' }
                },
                barPercentage: 0.9,
                categoryPercentage: 1
            },
            {
                label: 'Vermietende',
                data: dataFillVermietende,
                backgroundColor: 'rgba(0, 155, 180, 1)',
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'bottom',
                    font: {
                        family: 'Univers B'
                    },
                    display: 'auto',
                    formatter: (value) => { return value + ' €' }
                },
                barPercentage: 0.9,
                categoryPercentage: 1
            },
            {
                label: 'Mietende',
                data: dataDiscountMietende,
                backgroundColor: 'rgba(0, 155, 180, 0.15)',
                datalabels: {
                    display: false
                },
                barPercentage: 0.9,
                categoryPercentage: 1
            },
        ]
    } else {
        dataset = [
            {
                label: 'Vermietende',
                data: dataFillVermietende,
                backgroundColor: 'rgba(0, 155, 180, 1)',
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'bottom',
                    font: {
                        family: 'Univers B'
                    },
                    formatter: (value) => { return value + ' €' }
                },
                barPercentage: 0.9,
                categoryPercentage: 1
            },
            {
                label: 'Mietende',
                data: dataFillMietende,
                backgroundColor: 'rgba(0, 155, 180, 0.15)',
                datalabels: {
                    display: false
                },
                barPercentage: 0.9,
                categoryPercentage: 1
            },
        ]
    }

    const chartData = {
        labels,
        datasets: dataset,
    };

    return (
        <>
            <div className='d-flex w-100 mt-3 mb-3'>
                <BackButton
                    currentState={props.currentState}
                    setCurrentState={props.setCurrentState}
                    setCanContinue={props.setCanContinue} />
            </div>
            <div className='report-section'>
                <Row className={`mb-5 align-items-center ${props.currentState === 4 ? 'hidden-element-selection-4' : ''}`}>
                    <Col md={10}>
                        <Stack direction='horizontal' gap={3} className='justify-content-start'>
                            <div className='univers-bold'>
                                <div className='d-inline'>10 Jahre</div> <InfoModal currentState={props.currentState} InfoToShow={4}></InfoModal> <br />
                                <div>Gesamtkosten</div>
                            </div>
                            <div className={`stepper-text fs-40 ${showDiscount ? 'cross-text' : ''}`}>{CalculateYearlyCost(dataFillVermietende)} €
                            </div>
                            {showDiscount
                                ? (<><div className='discount-text stepper-text fs-40'>{parseFloat(CalculateYearlyCost(dataFillVermietende) - (CalculateYearlyCost(dataFillVermietende) * 0.08)).toFixed(2)} €</div>
                                    <InfoModal currentState={props.currentState} InfoToShow={5}></InfoModal></>)
                                : ('')}
                        </Stack>
                    </Col>
                    <Col md={2}>
                        <Stack>
                            <img className='icon-heizung' src={showDiscount ? IconHeizungsActive : IconHeizungsCheck} alt='IconHeizungCheck' onClick={showDiscountChart} />
                            <p>HeizungsCheck</p>
                        </Stack>
                    </Col>
                </Row>
                <Row className={`mb-3 ${props.currentState === 5 ? 'hidden-element-selection-5' : ''}`}>
                    <Stack direction="horizontal" gap={3} className='p-0'>
                        <Stack direction="horizontal" gap={3} className='p-3 white-box d-flex flex-fill'>
                            <Stack direction="horizontal" gap={3}>
                                <div className='choice-item'>
                                    <img src={selectedIcon} alt='item-icon' />
                                    <p className='choice-text'>{selectedName}</p>
                                </div>
                                <div className='univers-bold'>{props.Consumption.Value} {props.Consumption.Unit}</div>
                            </Stack>
                            <Stack direction="horizontal" gap={3}>
                                <div className='choice-item'>
                                    <img src={IconHouse} alt='house-icon' />
                                    <p className='choice-text'>Wohnfläche</p>
                                </div>
                                <div className='univers-bold'>{props.TotalArea} m<sup>2</sup></div>
                            </Stack>
                        </Stack>
                        <Stack direction="horizontal" gap={3} className='p-3 white-box blue-border-dashed'>
                            <div className='choice-item'>
                                <img src={IconCloud} alt='house-icon' />
                                <p className='choice-text'>CO<sub>2</sub> Emission</p>
                            </div>
                            <div className='univers-bold d-flex align-items-end'><div className='d-inline'>{parseFloat(TotalEmission() / 1000).toFixed(2)} t</div>
                                <InfoModal currentState={props.currentState} InfoToShow={3}></InfoModal></div>
                        </Stack>
                        <Stack direction="horizontal" gap={3} className='p-3 white-box blue-border d-flex flex-fill'>
                            <div className='univers-bold'>
                                <div className='d-inline'>10 Jahre</div> <InfoModal currentState={props.currentState} InfoToShow={4}></InfoModal> <br />
                                <div>Gesamtkosten</div>
                            </div>
                            <div className='stepper-text mb-4 fs-40'>{CalculateYearlyCost(dataFillVermietende)} €
                            </div>
                        </Stack>
                    </Stack>
                </Row>
                <Row className='mb-3 white-box p-5' id='report-content'>
                    <Col md={6}>
                        <div><span className='univers-bold fs-22'>Techem CO<sub>2</sub>-Kostenprognose:</span> Ihr Anteil beträgt {CalculateShare()}%</div>
                    </Col>
                    <Col md={6}>
                        <Row className='d-flex align-items-center'>
                            <Col md={8} className='tenant-text d-flex justify-content-end pe-0'>{100 - CalculateShare()}% Anteil and der CO<sub>2</sub>- Angabe</Col>
                            <Col md={1}><span className='dot tenant-dot'></span></Col>
                            <Col md={3} className='ps-0'><span className='black-text'>Mietende</span></Col>
                            <Col md={8} className='landlord-text d-flex justify-content-end pe-0'>{CalculateShare()}% Anteil and der CO<sub>2</sub>- Angabe</Col>
                            <Col md={1}><span className='dot landlord-dot'></span></Col>
                            <Col md={3} className='ps-0'><span className='univers-bold black-text'>Vermietende</span></Col>
                        </Row>
                    </Col>
                    <Row>
                        <Col id='bar-canvas'>
                            <Bar options={chartOptions} data={chartData} />
                        </Col>
                    </Row>
                </Row>
                {props.currentState === 5
                    ? ('')
                    : (<Row className='text-center white-box pt-5 ps-3 pe-5 extra-space'>
                        <h3 className='stepper-text'>Ihr CO<sub>2</sub>-Kostenanteil beträgt {CalculateShare()}%</h3>
                        <div>
                            Dieser Wert ergibt sich aus der Energiebilanz Ihres Gebäudes.
                            Je besser diese ist, desto niedriger ist Ihr voraussichtlicher Anteil an den CO2-Kosten als Vermieter.
                            Eine Verabschiedung des Gesetzes steht allerdings noch aus, weshalb es sich um eine unverbindliche Prognose handelt.
                            <br />
                            <br />
                            Sie möchten die Energiebilanz Ihrer Immobilie verbessern? Dabei helfen wir Ihnen gerne mit unseren innovativen Lösungen!
                        </div>
                    </Row>)}

            </div>
        </>
    )
}

const FifthSelection = ({ props }) => {
    return (
        <div>
            <FourthSelection props={props} />
        </div>
    )
}


const SelectionChoice = (props) => {
    switch (props.currentState) {
        case 1:
            return <FirstSelection props={props} />
        case 2:
            return <SecondSelection props={props} />
        case 3:
            return <ThirdSelection props={props} />
        case 4:
            return <FourthSelection props={props} />
        case 5:
            return <FifthSelection props={props} />
        default:
            return <InitSelection props={props} />
    }
}

export default SelectionChoice