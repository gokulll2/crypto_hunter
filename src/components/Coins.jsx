import React, { useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinDetails from "./CoinDetails";
import CoinCard from "./CoinCard";
import { css } from "@emotion/react";
function Coins() {
  const [Coins, setCoins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [currency, setCurrency] = React.useState("inr");
  const [next, setNext] = React.useState("");
  const [btn, setBtn] = React.useState(1);
  const changepage = (page) => {
    if (page < 1) return;
    setPage(page);
    setLoading(true);
    
  };
  const btns = new Array(132).fill(1);
  const currencySymbo =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  React.useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);
  const nextbtn = (index) => {
    // setLoading(true)
    // setPage((nextpage) => nextpage+1)
    setBtn(btn + 1);
    setNext(index + 1);
    setPage(btn + 1);
  };
  const prevbtn = (index) => {
    // setLoading(true)
    // setPage((nextpage) => nextpage-1)
    setBtn(btn - 1);
    setNext(index - 1);
    setPage(btn - 1);
  };

  const stylenext = {
    color: "white",
    backgroundColor: "black",
    height: "40px",
    width: "80px",
    borderRadius: "18px",
    fontFamily: "Roboto",
    fontSize: "18px",
  };
  const prevstyle = {
    cursor: "not-allowed",
  };
  if (error) {
    return <ErrorComponent message={"Error While Fetching Coins"} />;
  }
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
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
          <HStack
            w={"full"}
            overflowX={"auto"}
            p={"8"}
            justifyContent={"center"}
          >
            <button
              className="prev"
              disabled={btn <= 1 ? true : false}
              style={stylenext}
              onClick={() => {
                prevbtn(page);
              }}
            >
              Prev
            </button>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => {
                setPage(1);
              }}
            >
              1
            </Button>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              hidden={btn <= 1 ? true : false}
              onClick={() => {
                setPage(2);
              }}
            >
              2
            </Button>
            {btn>3 && <p>...</p>}
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => {
                setPage(btn);
              }}
              hidden={btn <= 2 ? true : false}
            >
              {btn}
            </Button>
            <button
              className="next"
              style={stylenext}
              onClick={() => {
                // changepage();
                nextbtn(page);
              }}
            >
              Next
            </button>
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coins; 
