import {useEffect,useState} from "react"

function useCurrencyInfo(currency){
    let url = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`
    const [data, setData] = useState({})
    useEffect(()=>{
        fetch(url)
        .then((res)=>{
           let k= res.json()
           return k;
        })
        .then((res)=>setData(res[currency]))
    },[currency])
    return data

}

export default useCurrencyInfo;