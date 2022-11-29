import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

const SearchMovieSkeletonCard = () => {
  return (
    <Card sx={{ display: "flex" }} style={{ borderBottom: "2px" }}>
      <Skeleton
        variant="rectangular"
        width={151}
        height={230}
        animation="wave"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Skeleton animation="wave" height={50} width="40rem" />
          <Skeleton animation="wave" height={40} width="60%" />
          <Skeleton animation="wave" height={40} width="40%" />
        </CardContent>
      </Box>
    </Card>
  );
};

export default SearchMovieSkeletonCard;
