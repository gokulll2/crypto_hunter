import React, { useEffect } from 'react'
import axios from "axios";  
import {server} from "../index"
import { Container , HStack , VStack , Image, Heading,Text, Button } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent  from './ErrorComponent';
import CoinDetails from './CoinDetails';
import CoinCard from './CoinCard';
function Coins() {
 
    const [Coins,setCoins]=React.useState([]);
    const [loading,setLoading]=React.useState(true)
    const [page,setPage]=React.useState(1) 
    const[error,setError]=React.useState(false);
    const[currency,setCurrency]=React.useState("inr")
  
    const changepage = (page) => {
        setPage(page)
        setLoading(true) 
    }
    const btns=new Array(132).fill(1)
    const currencySymbo = currency==="inr" ? "₹" : currency==="eur" ? "€" : "$"
    React.useEffect(() => {
        const fetchCoins= async() =>{
           try{
            const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

            setCoins (data);
            setLoading(false);
           }
           catch(error){
            setError(true);
            setLoading(false);

           }
        };
        fetchCoins()
    },[currency,page])
if(error)
{
    return <ErrorComponent message={"Error While Fetching Coins"} />
}
  return <Container maxW={"container.xl"}>
    {loading ? <Loader /> : 
    <> 
    <HStack wrap={"wrap"}>
        {Coins.map((i) => (
            <CoinCard 
            id={i.id}
            key={i.id}
            price={i.current_price}
             name={i.name} 
             img={i.image}
            symbol={i.symbol}
            currencySymbol={currencySymbo}
            />
        ))}
    </HStack>
    <HStack w={"full"} overflowX={"auto"} p={"8"}>
        {
            btns.map((item,index)=>(
                <Button  bgColor={"blackAlpha.900"} 
            color={"white"}
        onClick={() => {
            changepage(index+1)
        }}>{index+1}
        </Button>
            ))
        }
    </HStack>
    </> 
    }
  </Container>
}


export default Coins