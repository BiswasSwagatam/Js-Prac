import { useState, useEffect } from 'react'


export function useFetch(url) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  async function getData() {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [url])

  useEffect(() => {
    const interval = setInterval(() => getData(), 3000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return {data, loading}
}