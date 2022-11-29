
import { useState, useEffect } from "react";
import { Omdb } from "../Utils";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const FavouriteMovieCard = ({id,key}) => {
    const [details, setDetails] = useState({});
    
    useEffect(() => {
      (async _ => {
        const response = await Omdb.get(`?i=${id}&plot=full`)
        setDetails(response.data);
        // console.log(id);
        console.log(response.data);
        
      })();
    },[id]);
   
    
    return(

      
          <Card sx={{ maxWidth: 345 }} key={key} >
        <Link to={`/Detail/${details.imdbID}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                image={details.Poster === "N/A" ? ("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png") : details.Poster }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {details.Title}
                </Typography>
              
              </CardContent>
            </CardActionArea>
        </Link>
          </Card>
      
           
      
     
       
    );
    
}

export default FavouriteMovieCard;