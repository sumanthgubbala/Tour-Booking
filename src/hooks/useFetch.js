import { useState  ,useEffect} from "react";

const useFetch = (url)=>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                if(!response.ok){
                    setError('failed to fetch');
                    alert('Failed to fetch');
                }
                const result =  await response.json()
                setData(result.data)
                setLoading(false)
            }catch (err) {
                setError(err.message);
                setLoading(false)
            }
        }
        fetchData();
    },[url]);
    return {
        data,
        error,
        loading
    }

}


export default useFetch