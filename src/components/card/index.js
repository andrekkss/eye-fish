import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import LinesEllipsis from 'react-lines-ellipsis'
 
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      height: '240px',
      overflowY: 'hidden'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#E54B4B',
    },
}));
  
export default function ReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActionArea onClick={props.callback}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.title.charAt(0)}
                    </Avatar>
                }
                title={props.title}
                subheader={props.subTitle}
            />
            <CardMedia
                className={classes.media}
                image={props.urlImage}
                title={props.title}
            />
            <CardContent>
              <LinesEllipsis
                text={''}
                maxLine='3'
                ellipsis='...'
              />
            </CardContent>
        </CardActionArea>
    </Card>
  );
}