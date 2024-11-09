import React, {useState} from 'react';

export default function PhoneInput() {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(format(event.target.value))
  }

  return (
    <>
      <input 
        type='tel'
        value={value}
        onChange={onChange}
        placeholder='(555) 555-5555'
      />
      <button disabled={value.length < 14} onClick={() => setValue('')}>Submit</button>
    </>
  );
}

function format(str) {
  const rawString = str.replace(/\D/g, '')
  let output = ''

  if(rawString.length > 0){
    output += '('
    output += rawString.substring(0,3)
  }

  if(rawString.length > 3){
    output += ') '
    output += rawString.substring(3,6)
  }

  if(rawString.length > 6){
    output += '-'
    output += rawString.substring(6,10)
  }
  return output
}
