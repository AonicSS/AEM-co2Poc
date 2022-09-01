import React from 'react'
import ImageFinalOne from '../../assets/images/ImageFinalOne.png'
import ImageFinalTwo from '../../assets/images/ImageFinalTwo.png'
import ImageFinalThree from '../../assets/images/ImageFinalThree.png'
import ImageFinalFour from '../../assets/images/ImageFinalFour.png'
import ImagePdfThreeOne from '../../assets/images/pdfThreeOne.png'
import ImagePdfThreeTwo from '../../assets/images/pdfThreeTwo.png'
import ImagePdfThreeThree from '../../assets/images/pdfThreeThree.png'
import IconArrow from '../../assets/icons/IconArrow.svg'
import { Button, Stack, Row, Col } from 'react-bootstrap'

import './style.css'

const FinalPage = () => {
    return (
        <div>
            <div>
                <Row className='final-headline mb-5'>
                    <img src={ImageFinalOne} alt='ImageFinalOne' />
                    <h3 className='stepper-text'>Steigern Sie durch Energieeffizienz <br /> den Wert Ihrer Immobilie</h3>
                    <Button className='col-md-3 rounded-pill' variant="continue" href='#anchor'>Direkt zum HeizungsCheck</Button>
                </Row>
                <Row className='mb-5'>
                    <h4 className='stepper-text'>Energie sparen mit Techem</h4>
                    <p>Kosten kennen. Klug planen. Mit Weitblick investieren. Mit Techem erhalten Sie nicht nur eine Einschätzung über die voraussichtlichen CO2-Kosten,
                        die Sie erwarten. Wir unterstützen Sie zudem gerne mit smarten Lösungen beim Energiesparen.
                        Verschaffen Sie sich hier einen einfachen Überblick über unser Angebot plus voraussichtlicher Einsparpotentiale!</p>
                </Row>
                <Row className='mb-5'>
                    <Stack direction='horizontal' gap={3}>
                        <div>
                            <img src={ImageFinalTwo} alt='ImageFinalTwo' />
                        </div>
                        <Stack className='justify-content-between'>
                            <h4 className='stepper-text'>
                                Unkompliziert Abgaben reduzieren mit unseren Energiespartipps
                            </h4>
                            <p>
                                Damit Ihre Mieter ihren Verbrauch noch einfacher reduzieren können, haben wir sieben einfache Tipps zum Thema „Clever heizen“ zusammengestellt.
                                Hier erfahren Sie, was die optimale Raumtemperatur ist, wie man richtig lüftet und wie sich bis zu 50 kg CO2 im Jahr - quasi im Schlaf - sparen lassen!
                            </p>
                            <Button variant='continue' className='col-md-4 rounded-pill'>Gleich reinlesen</Button>
                        </Stack>
                    </Stack>
                </Row>
                <Row className='mb-5'>
                    <Stack direction='horizontal' gap={3}>
                        <Stack className='justify-content-between'>
                            <h4 className='stepper-text'>
                                Unterjährige Verbrauchsinfo
                            </h4>
                            <p>
                                Durch mehr Transparenz mit der EED-Verbrauchsinfo von Techem können Mieter sowie Eigentümer ihren Verbrauch effizient senken - und damit auch die Kosten!
                                Denn: Nur wer seinen Verbrauch kennt, kann gezielt Energie sparen.
                                Aktivieren Sie noch heute die EED-Verbrauchsinfo!
                            </p>
                            <Button variant='continue' className='col-md-4 rounded-pill'>Mehr erfahren</Button>
                        </Stack>
                        <div>
                            <img src={ImageFinalThree} alt='ImageFinalTwo' />
                        </div>
                    </Stack>
                </Row>
                <Row className='grey-box justify-content-center mb-5' id='anchor'>
                    <img className='p-0' src={ImageFinalFour} alt='ImageFinalFour' />
                    <div className='red-circle' onClick={() => console.log('clicked')}>
                        <p className='mt-4'>Klicken und <br />sparen</p>
                    </div>
                    <h4 className='stepper-text ps-5 mt-5'>HeizungsCheck</h4>
                    <p className='p-5 pt-0'>
                        Damit eine Heizungsanlage effizient läuft, müssen ihre Komponenten richtig eingestellt und auf den Energiebedarf des Hauses abgestimmt sein.
                        Darum kümmern wir uns gerne: Unsere Energieeffizienzprofis bewerten den energetischen Zustand Ihrer Heizungsanlage sowie des Heizmediums und stellen fest, ob sie noch wirtschaftlich arbeitet.
                        So erfassen wir die Energieeffizienz Ihrer Anlage und leiten Maßnahmen zur nachhaltigen Verbesserung der Energiebilanz ab. Die Ergebnisse und daraus resultierende Optimierungsvorschläge stellen wir für Sie in einem abschließenden Inspektionsbericht anschaulich dar, sodass Sie gut informierte Investitionsentscheidungen treffen können.
                    </p>
                    <img className='icon-arrow' src={IconArrow} alt='IconArrow' />
                </Row>
            </div>
            <div id='pdf-section'>
                <div className='page-1'>
                    <div className="v1_69">
                        <div className="v1_70">
                            <div className="v1_71">
                                <div className="v1_72"></div>
                                <div className="v1_73"></div>
                            </div>
                        </div>
                        <div className="v1_74"></div><span className="v1_75">Techem CO2-Abgabe-Rechner</span><span className="v1_76">Kosten kennen. Klug
                            planen. Mit Techem CO2-Abgabe reduzieren.</span>
                        <div className="v1_77"></div>
                        <div className="v1_78"></div>
                        <div className="v1_79">
                            <div className="v1_80"></div>
                        </div><span className="v1_81">
                            TECHEM CO2 ABGABEPROGNOSE</span><span className="v1_82">Ihre individuelle Kostenprognose zur CO2-Abgabe</span>
                    </div>
                </div>
                <div className='page-2'>
                    <div className='univers-bold mb-3'>Techem CO2-Abgabe-Prognose</div>
                    <div>Ihre individuelle Kostenprognose zur CO2-Abgabe Erhalten Sie einen schnellen
                        Überblick über die zu erwartende CO2-Abgabe individuell für Ihre Liegenschaft berechnet.
                        Als kleines Plus haben wir Ihnen zudem die aktuelle Rechtslage zur CO2-Umlage
                        zusammengefasst und zeigen Ihnen, mit welchen einfachen Maßnahmen
                        Sie und Ihre Mieterinnen und Mieter Energie und somit Emissionen sparen können!
                    </div>
                    <div id='chart-section'></div>
                    <div>Dieser Wert ergibt sich aus der Energiebilanz Ihres Gebäudes.
                        Je besser diese ist, desto niedriger ist Ihr voraussichtlicher Anteil an den CO2-Kosten als Vermieterin oder Vermieter.
                        Eine Verabschiedung des Gesetzes steht allerdings noch aus, weshalb es sich um eine unverbindliche Prognose handelt.
                    </div>
                    <div>
                        <div className='univers-bold mb-3'>Die Rechtslage kurz erklärt</div>
                        <div>Anfang April hat sich die Bundesregierung auf die Neuregelung zur Verteilung der
                            CO2-Bepreisungskosten zwischen Mietenden und Vermietenden geeinigt.
                            Damit nimmt die Regierung nun auch Vermietende mehr in die Pflicht.
                            Sie sollen bei den Heizkosten und der Warmwasseraufbereitung ab 2023 anteilig
                            am CO2-Preis beteiligt werden - abhängig von der Klimafreundlichkeit des Gebäudes.
                            Dafür ist ein Zehn-Stufenmodell vorgesehen: Bei Wohnungen mit einer besonders schlechten
                            Energiebilanz übernehmen Vermietende 90 Prozent und Mietende 10 Prozent der CO2-Kosten.
                            In den weiteren Stufen nimmt der Anteil für Vermietende ab.

                        </div>
                    </div>
                </div>
                <div className='page-3'>
                    <div className='univers-bold'>Wir helfen Ihnen gerne, die Energiebilanz <br /> Ihrer Immobilie zu verbessern!</div>
                    <img src={ImagePdfThreeOne} alt='pdf-img' />
                    <div className='univers-bold mb-3'>Dank Techem Heizungscheck die Energieeffizienz steigern</div>
                    <div>Unsere Energieeffizienzprofis bewerten den energetischen Zustand Ihrer Heizungsanlage sowie des Heizmediums
                        und stellen fest, ob sie noch wirtschaftlich arbeitet. Die Ergebnisse und daraus resultierende
                        Optimierungsvorschläge erhalten Sie von uns in einem Inspektionsbericht.
                        So können Sie gut informierte Investitionsentscheidungen treffen!</div>
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <div className='d-flex justify-content-center'><img src={ImagePdfThreeTwo} alt='pdf-img' /></div>
                            <div className='univers-bold mb-3'>CO2-Abgabe reduzieren mit unseren Energiespartipps</div>
                            <div>Was ist die optimale Raumtemperatur? Wie lüftet man richtig? Und warum sollte die Heizung nicht
                                komplett ausgestellt werden? Mit unseren sieben Tipps rund um das Thema „Clever heizen“ können
                                Ihre Mieterinnen und Mieter ihren Verbrauch noch stärker reduzieren!</div>
                            <div className='d-flex justify-content-center'><img src={ImagePdfThreeThree} alt='pdf-img' /></div>
                            <div className='univers-bold mb-3'>Mit der unterjährigen Verbrauchsinfo ca. 5 bis 10 % Einsparung erzielen</div>
                            <div>Beim Energiesparen unterstützt die EED-Verbrauchsinfo von Techem! Sie enthält detaillierte
                                Angaben zum Verbrauch von Heizung und Warmwasser für Ihre Mieterinnen und.
                                Durch das Mehr an Transparenz kann der Verbrauch effizient sinken - und damit auch die Kosten.</div>
                            <a href='https://www.google.com'>google</a>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default FinalPage