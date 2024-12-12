import {useEffect, useState} from "react"

function useCurrencyInfo(currency){
    const[data,setData] = useState({})  // if there is no fetch call , then the app doesn't crash
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => {
                if (res[currency]) {
                    setData(res[currency]);
                } else {
                    console.error("Invalid data fetched");
                    setData({});
                }
            })
            .catch((err) => console.error("Fetch error: ", err));
    }, [currency]);
    
    console.log(data);
    return data;
}

export default useCurrencyInfo