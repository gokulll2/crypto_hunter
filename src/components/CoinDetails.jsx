import { Box, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
function CoinDetails() {
    const [Coin,setCoin]=React.useState([]);
    const [loading,setLoading]=React.useState(true)
    const[error,setError]=React.useState(false);
    const[currency,setCurrency]=React.useState("inr")
    const params = useParams()
    React.useEffect(() => {
        const fetchCoin= async() =>{
            try{
             const { data } = await axios.get(`${server}/coins/${params.id}`)
 
             setCoin(data);
             setLoading(false);
            }
            catch(error){
             setError(true);
             setLoading(false);
 
            }
            fetchCoin()
        }
    }, [params.id])

    if(error) return <ErrorComponent message={"Error while fetching coin"}/>

  return (
   <Container maxw={"container.xl"}>
    {
        loading ? <Loader/> : (
            <> 
            <Box borderWidth={1} width={"full"} >
sddssds
            </Box>




        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
         <Radio  value={"inr"}>INR</Radio>
         <Radio value={"usd"}>USD</Radio>
        <Radio value={"eur"}>EUR</Radio>
        </HStack>
        </RadioGroup>
            </>
        )
    }
   </Container>
  )
}

export default CoinDetails