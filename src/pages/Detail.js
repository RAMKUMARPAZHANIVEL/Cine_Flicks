import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import { Omdb } from "../Utils";
import { Box, Stack, Typography, Chip } from "@mui/material";
import axios from "axios";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import useLocalStorage from "use-local-storage";



const Detail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [flag, setFlag] = useState("");
  const [favorites, setFavourites] = useLocalStorage("favorites", "[]");
  const[isFavorite, setFavourite] =useState(true);
  
  useEffect(()=> {
    const favs = JSON.parse(favorites);
    if(favs.includes(id)){
      setFavourite(true);
    }
    else{
      setFavourite(false);
    }
  },[favorites, id]);
  
  const toggleFavourite = _ => {
    const favs = JSON.parse(favorites);
    if(isFavorite){
      const idx = favs.indexOf(id);
      favs.splice(idx,1);
      setFavourite(false);
    }
    else{
      favs.push(id);
      setFavourite(true);
    }
    console.log(favs);
     setFavourites(JSON.stringify(favs));

  }

  useEffect(() => {
    (async _ => {
      const response = await Omdb.get(`?i=${id}&plot=full`)
      setDetails(response.data);
      console.log(response.data)
    
    })();
  },[id]);

  useEffect(()=> {
    if(details.Country?.length > 0){
      (async _ => {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${details.Country}`);
        console.log(res.data[0]);
        setFlag(res?.data[0]?.flags?.svg);
        console.log(res?.flags?.svg);
      })()
    }
    else{
      setFlag("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png");
    }
    },[details]);
    

  
    return(
     <>
      <Box p={4}>
        <Stack  >
        
         <Stack direction="row" spacing={2} >
          <img src={details.Poster === "N/A" ? ("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png") : details.Poster} alt="movie poster"/> 
          <Box className="detail-innercard">
            <Typography variant="h3">
              {details.Title}
              &nbsp;
              <IconButton color="error" size="large" onClick={toggleFavourite}>
                { isFavorite? <FavoriteIcon /> : <FavoriteBorderRoundedIcon /> }  
              
            </IconButton>
            </Typography>
                        
            <Typography variant="h5">Crew</Typography>
            <Stack direction="row" gap={2} sx={{flexWrap:"wrap"}}ml={10} >
              {details.Actors?.split(",").map((elem, idx) => {
               return(
                <Chip  label={elem}  key={idx}/>
               )
               })}
               {details.Writer?.split(",").map((e,i) => {
                return(<Chip label={e} key={i}/>)
                })}

            </Stack>
               <Stack direction="column" gap={2} mt={2} >
                <Stack direction="row" gap={2}>
                  <Typography variant="h5">Director </Typography><Chip label={details.Director} color="primary" variant="outlined" />
                </Stack>
                <Stack direction="row" gap={2} >
                  <Typography variant="h5" mr={2}>Genre </Typography>
                  {details.Genre?.split(",").map((e,i) => {
                  return( 
                    <Chip label={e} color="primary" variant="outlined" key={i} />)
                  })}
                
                </Stack>

                 <Stack direction="row" gap={2}>
                   <Typography variant="h5">Rating : {details.imdbRating}</Typography>
                 </Stack>
               </Stack>
            <Stack direction="row" spacing={2} alignItems="center" mt={2} >
              <img src={flag} height={40} style={{outline:"1px solid black", outlineOffset:"2px" }} alt="flag" />
              <Typography >{details.Country}</Typography>
            </Stack>
    
          </Box>
         </Stack>
         {/* {details.Country?.split(",").map((e,i) => {
            setFlag(e);
                return(       
                 <Stack direction="row" spacing={2} alignItems="center" mt={2} key={i}>
                  <img src={e} height={40} style={{outline:"1px solid black", outlineOffset:"2px" }} alt="flag" />
                <Typography >{e}</Typography>
                </Stack>)
                })} */}
            <Typography style={{textAlign:"justify",textJustify:"interWord"}} mt={3}>
              {details.Plot}
            </Typography>

        </Stack>
      </Box>
     </>
    );
}

export default Detail