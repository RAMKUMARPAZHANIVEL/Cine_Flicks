import { useState, useEffect } from "react";
import { Omdb } from "../Utils";
import { useSearchParams } from "react-router-dom";
import SearchMovieCard from "../components/searchMovieCard";
import { Box, Typography } from "@mui/material";
import * as React from 'react';
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import InfiniteScroll from "react-infinite-scroller";

const Search = () => {
  
    const[list, setList] = useState([]);
    const [params] = useSearchParams();
    const[totalResults, setTotalResults] = useState(0);
    const navigate = useNavigate();
    
    const loadData = () => {
      
      (async _ => {
        const pageNo = Math.floor(list.length/10 + 1);  
        const res = await Omdb.get(`?s=${params.get("q")}&page=${pageNo}`);
        if(res.data.Response === "False"){
          if(pageNo === 1)
             navigate("/404");
          else
            return;
        }
        setTotalResults(res.data.totalResults);
        setList( currentList => {
          return [...currentList,...res.data.Search]
        });
          console.log(res.data.Search);
      })();
      
          
      }
    

    useEffect(() => {
       if(params.has("q") && params.get("q") !== ""){
         setList([]);
      //    setTotalResults(0);
      //   (async _ => {
      //     const response = await Omdb.get(`?s=${params.get("q")}`)
      //      setList(response.data.Search);
           
      //     console.log(response.data.Response);
      // //     // if(response.data.Response === "False"){
      // //     //     console.log("failed");
      // //     //      navigate("/404");
      // //     // }
          
      //    })();
        }
       },[params]);
       
     
    
    return(
        <Box p={3} >
          <Typography >{totalResults} Results found</Typography>
          <InfiniteScroll
            pageStart={1}
            loadMore={loadData}
            hasMore={ (totalResults === 0) || (list.length < totalResults)}
            loader={<Loader />}
            >
            
          <Stack spacing={2} mb={1} mt={1}>
                {list.map((singleElem,idx) => {
                  return(
                   <Box key={idx}>
                    <SearchMovieCard singleElem={singleElem}  />
                   </Box>

                  )
                })}
            </Stack>
          </InfiniteScroll>
        </Box>
     

    );
}





export default Search