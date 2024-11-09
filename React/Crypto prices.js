import React, {useState, useEffect} from 'react';

const CRYPTO_PRICES_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/cryptocurrencies';
  
export default function CryptoPrices() {
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(true)

  useEffect(() => {
    const callFetch = async () => {
      const url = new URL(CRYPTO_PRICES_API_BASE_URL)
      url.searchParams.set('page', page)
      const res = await fetch(url)
      const {coins, hasNext} = await res.json()
      setCoins(coins)
      setHasNext(hasNext)
    }
    callFetch()
  }, [page])

  return (
    <>
      <table>
        <caption>Crypto Prices</caption>
        <thead>
          <tr>
            <th scope='col'>Coin</th>
            <th scope='col'>Price</th>
            <th scope='col'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.name}>
              <th scope='row'>{coin.name}</th>
              <td>{coin.price}</td>
              <td>{coin.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page<=0} onClick={() => setPage(page-1)}>
        Back
      </button>
      <button disabled={!hasNext} onClick={() => setPage(page+1)}>
        Next
      </button>
    </>
  );
}