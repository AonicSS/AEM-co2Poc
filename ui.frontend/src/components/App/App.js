import React from "react";
import { useState } from "react"

import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import Stepper from "./components/Stepper/stepper"
import SelectionChoice from "./components/SelectionChoice/selectionChoice"
import FinalPage from "./components/FinalPage/finalPage";
import { ContinueButton } from "./components/Button/button"

const App = () => {
  const [currentState, setCurrentState] = useState(0)
  const [currentSelected, setCurrentSelected] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [Consumption, setConsumption] = useState()
  const [TotalArea, setTotalArea] = useState()
  const [Email, setEmail] = useState('')

  currentState === 4 ? document.body.style.background = '#d9d9d980' : document.body.style.background = 'white'

  return (
    <div className="App d-flex flex-column align-items-center container mb-5">

      {currentState > 3
        ? ('')
        : (<Stepper currentState={currentState}
          setCurrentState={setCurrentState}
          setCanContinue={setCanContinue}></Stepper>)}

      {currentState === 5 ? (<FinalPage />) : ''}

      <SelectionChoice currentState={currentState}
        setCurrentState={setCurrentState}
        currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
        Consumption={Consumption}
        setConsumption={setConsumption}
        TotalArea={TotalArea}
        setTotalArea={setTotalArea}
        Email={Email}
        setEmail={setEmail}
        canContinue={canContinue}
        setCanContinue={setCanContinue}
      ></SelectionChoice>

      {currentState === 3 ? ('') : (<ContinueButton currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
        currentState={currentState}
        setCurrentState={setCurrentState}
        canContinue={canContinue}
        setCanContinue={setCanContinue}></ContinueButton>)}

    </div>
  );
}

export default App;
