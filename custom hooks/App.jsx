


import { useState } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch'




function App() {
  const [post, setPost] = useState(1)
  const {data, loading} = useFetch('https://jsonplaceholder.typicode.com/posts/' + post)

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <>
    <div>
      <div>
        {JSON.stringify(data)}
      </div>
      <div>
        <button onClick={() => setPost(1)}>1</button>
        <button onClick={() => setPost(2)}>2</button>
        <button onClick={() => setPost(3)}>3</button>
      </div>
    </div>
   
    
    
    </>
  )
}



export default App
