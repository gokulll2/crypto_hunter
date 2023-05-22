import { Box, Container, HStack, Radio, RadioGroup, VStack , Text , Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react'
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
    const currencySymbo = currency==="inr" ? "₹" : currency==="eur" ? "€" : "$"
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
                Last Updated On {Date(Coin?.market_data).split("G")[0]}
            </Text>

            <Image 
            src={Coin?.image?.large} 
            w={"16"}
             h={"16"} 
            objectFit={"contain"}/>

            <Stat>
                <StatLabel>
                    {Coin.name}
                </StatLabel>
                <StatNumber>{currencySymbo}{Coin?.market_data?.current_price[currency]} </StatNumber>
                <StatHelpText>
                    <StatArrow type="decrease"/>
                </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"}>
                {`#${Coin?.market_cap_rank}`}
            </Badge>

            <CustomBar 
            high={`${currencySymbo}${Coin?.market_data?.high_24h[currency]} `}
            low={`${currencySymbo}${Coin?.market_data?.low_24h[currency]} `}
            />
        </VStack>

        <Box  w={"full"}
            p={"4"}>

            <Item title ={"Max Supply"} value={Coin.market_data.max_supply}/>

            <Item title ={"Circulating Supply"} value={Coin.market_data.circulating_supply}/>

            <Item title ={"Market Cap"} 
            value={`${currencySymbo}${Coin.market_data.market_cap[currency]}`}/>

              <Item title ={"All Time Low"} 
            value={`${currencySymbo}${Coin.market_data.atl[currency]}`}/>

              <Item title ={"All Time High"} 
            value={`${currencySymbo}${Coin.market_data.ath[currency]}`}/>
        </Box>
            </>
        )
    }
   </Container>
  )
}

const Item = (title,value) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"wildest"}>
            {title}
        </Text>
        <Text>
            {value}
        </Text>
    </HStack>
)
const CustomBar=({high,low})=>(
     <VStack>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}/>
        <Badge children={low} colorScheme={"red"} />
        <Badge children={high} colorScheme={"green"} />
     </VStack>
)

export default CoinDetails