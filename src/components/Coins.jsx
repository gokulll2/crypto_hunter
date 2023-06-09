import React, { useEffect } from 'react'
import axios from "axios";  
import {server} from "../index"
import { Container , HStack , VStack , Image, Heading,Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
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
    const[next,setNext]=React.useState("")
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
    const nextbtn = ((index) => {
        setNext(index+1)
    })
if(error)
{
    return <ErrorComponent message={"Error While Fetching Coins"} />
}
  return <Container maxW={"container.xl"}>
    {loading ? <Loader /> : 
    <> 
    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
            <Radio  value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
        </HStack>
    </RadioGroup>
    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
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
        <button className='prev'>Prev</button>
        {/* {
            btns.map((item,index)=>(
                <Button  bgColor={"blackAlpha.900"} 
            color={"white"}
        onClick={() => {
            changepage(index+1)
        }}>{index+1}
        </Button>
            ))
        } */

       btns.map(() => {
        <Button bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => {
                    
                }}
        >

        </Button>
       })
  }

        <button className='next' onClick={nextbtn()}>Next</button>
    </HStack>
    </> 
    }
  </Container>
}


export default Coins