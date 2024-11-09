import React, {useState} from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState(50)
  const [tipPercentage, setTipPercentage] = useState(18)
  const [person, setPerson] = useState(1)

  const totalTip = (bill * tipPercentage) / 100
  const tipPerPerson = totalTip/person

  return (
    <>
      <label htmlFor='bill'>Bill</label>
      <input 
        id='bill'
        type='number'
        min='0'
        value={bill}
        onChange={event => {
          setBill(parseInt(event.target.value))
        }}
      />
      <label htmlFor='tip'>Tip Percentage</label>
      <input 
        id='tip'
        type='number'
        min='0'
        value={tipPercentage}
        onChange={event => {
          setTipPercentage(parseInt(event.target.value))
        }}
      />
      <label htmlFor='person'>Number of People</label>
      <input 
        id='person'
        type='number'
        min='1'
        value={person}
        onChange={event => {
          setPerson(parseInt(event.target.value))
        }}
      />
      <p>Total Tip: {isNaN(totalTip) ? '-' : `$${totalTip.toFixed(2)}`} </p>
      <p>Tip Per Person: {isNaN(tipPerPerson) ? '-' : `$${tipPerPerson.toFixed(2)}`} </p>
    </>
  );
}