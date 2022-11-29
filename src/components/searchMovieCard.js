import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SearchMovieSkeletonCard from "./searchSkeletonCard";
import { useState, useEffect } from "react";

const SearchMovieCard = ({ singleElem }) => {
  const [isLoading, setSkeleton] = useState(true);

  useEffect((_) => {
    setTimeout((_) => setSkeleton(false), 10000);
  }, []);
  return (
    <>
      {isLoading ? (
        <SearchMovieSkeletonCard />
      ) : (
        <Card
          sx={{ display: "flex" }}
          style={{ borderBottom: "2px" }}
          mt={2}
          spacing={4}
          mb={4}
        >
          <Link to={`/Detail/${singleElem.imdbID}`}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={
                singleElem.Poster === "N/A"
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                  : singleElem.Poster
              }
              alt="album cover"
            />
          </Link>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Link to={`/Detail/${singleElem.imdbID}`}>
                <Typography component="div" variant="h5">
                  {singleElem.Title}
                </Typography>
              </Link>
              <Typography>{singleElem.Type}</Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                mt={2}
              >
                Released in {singleElem.Year}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      )}
    </>
  );
};

export default SearchMovieCard;
