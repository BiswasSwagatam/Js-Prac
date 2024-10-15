import { useEffect, useState } from "react"

function App() {

  const [count,setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  function increaseCount() {
    setCount(count + 1)
  }

  function decreaseCount() {
    setCount2(count2 - 1)
  }

  return (
    <div>
      <Counter count={count} count2={count2}/>
      <button onClick={increaseCount}>Increase count</button>
      <button onClick={decreaseCount}>Decrease count</button>
    </div>
  )
}

function Counter(props) {

  useEffect(() => {
    console.log("Mounted")

    return () => {
      console.log("Unmounted")
    }
  }, [props.count])

  useEffect(() => {
    console.log("Count Updated")

    return () => {
      console.log("Count Unmounted")
    }
  }, [props.count])

  return (
    <div>
      <h1>Counter 1 :  {props.count}</h1>
      <h1>Counter 2 :  {props.count2}</h1>
    </div>
  )
}

export default App
