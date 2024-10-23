
import { useState } from 'react'
import './App.css'
import { createContext } from 'react'
import { useContext } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, evenSelector } from './store/atoms/counter'

// const CountContext = createContext()

// function CountContextProvider({children}) {
//   const [count,setCount] = useState(0)
//   return (
//     <CountContext.Provider value={{count,setCount}}>
//       {children}
//     </CountContext.Provider>
//   )
// }

// RECOIL
// function App() {

//   return (
//     <>
//       {/* <CountContextProvider> */}
//       <RecoilRoot >
//         <Counter />
//       </RecoilRoot>
//       {/* </CountContextProvider> */}
//     </>
//   )
// }

// function Counter() {
//   return (
//     <div>
//       <CurrentCount />
//       <IncreaseCount />
//       <DecreaseCount />
//     </div> 
//   )
// }

// function CurrentCount() {
//   const count = useRecoilValue(counterAtom)
//   return(
//     <div>
//       <h4>Current Count: {count}</h4>
//     </div>
//   )
// }

// function IncreaseCount() {
//   const setCount = useSetRecoilState(counterAtom)
//   function increase() {
    
//     setCount(count => count + 1)
//   }
//   return (
//     <div>
//       <button onClick={increase}>Increase</button>
//     </div>
//   )
// }

// function DecreaseCount() {
//   const setCount = useSetRecoilState(counterAtom)
//   function decrease() {
    
//     setCount(count => count - 1)
//   }
//   return (
//     <div>
//       <button onClick={decrease}>Decrease</button>
//     </div>
//   )
// }

// export default App





// RECOIL SELECTORS
function App() {
  return (
    <>
      <RecoilRoot>
        <Buttons />
        <Counter />
        <IsEven />
      </RecoilRoot>
    </>
  )
}

function Buttons() {
  const setCount = useSetRecoilState(counterAtom)

  function increase() {
    setCount(count => count + 2)
  }

  function decrease() {
    setCount(count => count - 1)
  }

  return(
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

function Counter() {
  const count = useRecoilValue(counterAtom)
  return(
    <div>
      <h4>Current Count: {count}</h4>
    </div>
  )
}

function IsEven() {
  const even = useRecoilValue(evenSelector)

  return(
    <div>
      {even? "Even": "Odd"}
    </div>
  )
}

export default App