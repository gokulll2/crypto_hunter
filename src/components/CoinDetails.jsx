import { Box, Container, HStack, Radio, RadioGroup, VStack , Text , Image } from '@chakra-ui/react'
// import React from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import React , { useEffect , useState } from "react"
function CoinDetails() {
    const [Coin,setCoin]=React.useState([]);
    const [loading,setLoading]=React.useState(false)
    const[error,setError]=React.useState(false);
    const[currency,setCurrency]=React.useState("inr")
    const params = useParams()
    React.useEffect(() => {
        const fetchCoin= async () =>{
            try{
            setLoading(true)
             const { data } = await axios.get(`${server}/coins/${params.id}`)
             console.log(data);
             setCoin(data);
             setLoading(false);
            }
            catch(error){
             setError(true);
             setLoading(false);
 
            }
        }
        fetchCoin();
    }, [])

    if(error) return <ErrorComponent message={"Error while fetching coin"}/>

  return (
   <Container maxW={"container.xl"}>
    {
        loading ? <Loader/> : (
            <> 
            <Box borderWidth={1} width={"full"} >

            </Box>




        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
         <Radio  value={"inr"}>INR</Radio>
         <Radio value={"usd"}>USD</Radio>
        <Radio value={"eur"}>EUR</Radio>
        </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"} >
                Last Updated On {Date().split("G")[0]}
            </Text>

            <Image 
            src={Coin.image.large} 
            w={"16"}
             h={"16"} 
            objectFit={"contain"}/>
        </VStack>
            </>
        )
    }
   </Container>
  )
}

export default CoinDetails