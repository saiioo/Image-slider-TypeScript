import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";

interface Image {
  id: string;
  src: string;
  alt: string;
  text: string;
}

const images: Image[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1682794450045-762b6753615d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    alt: "Image 1",
    text: "Image 1 Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1682605637737-2593090323fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    alt: "Image 2",
    text: "Image 2 Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1682772844476-f10b1ce014d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    alt: "Image 3",
    text: "Image 3 Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imgBox: {
    padding:"3px",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    display:"flex",
    width:"90%",
    justifyContent:"center",
    alignItems:"center",
    gap:"20px"
  },
  image: {
    width: "60%",
    height: "300px",
    objectFit: "contain",
    borderRadius:"6px"
  },
  textContainer: {
    width:"50%",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4), 0px 0px 20px rgba(0, 0, 0, 0.2), 0px 0px 30px rgba(0, 0, 0, 0.1)",
    padding:"20px",
    textAlign:"center",
    borderRadius:"10px",
    fontSize:"12px"
  },
  text: {
    marginBottom: "1rem",
    fontSize:"14px"
  },
  thumbnailContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "1rem",
  },
  thumbnail: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    margin: "0.5rem",
    cursor: "pointer",
    border: "2px solid transparent",
    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    borderRadius:"2px"
  },
  twoM: {
    display: "flex",
  },
  '@media (max-width: 1200px)': {
    root:{
      display:"flex",
      flexDirection:"column",
      gap:"30px",
      height:"auto"
    },

    imgBox: {
      flexDirection: "column",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height:"300px"
    },
    text:{
      width:"90%",
      fontSize:"14px",
      height:"auto"
    },
    imageContainer:{
      marginBottom:"20px",
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
    },
    textContainer:{
      width:"100%"
    },
    btns:{
      height: 30,
      fontSize:"12px",
    },
    thumbnail:{
      height:"90px"
    }

  }
}));

const ImageSlider = () => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handlePlayPauseClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleNextClick = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrevClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <div className={classes.imgBox}>
          <CardMedia
            className={classes.image}
            component="img"
            src={images[currentImage].src}
            alt={images[currentImage].alt}
          />
          <div className={classes.textContainer}>
            <Typography variant="h6" className={classes.text}>
              {images[currentImage].text}
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {`${currentImage + 1}/${images.length}`}
            </Typography>
          </div>
        </div>
        <CardActions disableSpacing>
            <IconButton onClick={handlePlayPauseClick}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </CardActions>
        <div className={classes.twoM}>
          <IconButton onClick={handlePrevClick}>
            <NavigateBefore />
          </IconButton>
          <div className={classes.thumbnailContainer}>
            {images.map((image, index) => (
              <Button
                key={image.id}
                className={classes.thumbnail}
                onClick={() => handleThumbnailClick(index)}
              >
                <CardMedia
                  component="img"
                  image={image.src}
                  alt={image.alt}
                  style={{ opacity: index === currentImage ? 0.5 : 1 }}
                />
              </Button>
            ))}
          </div>
          <IconButton onClick={handleNextClick}>
            <NavigateNext />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
