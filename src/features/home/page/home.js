import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '../../../components/card/index';
import { makeStyles } from '@material-ui/core/styles';
import { my } from '../../../utils/my';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
        width: '100% !important',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: "#f2f2f2",
    },
    gridList: {
      flexWrap: 'nowrap',
      overflowY: 'hidden'
    },
    gridListTile: {
      height: '100% !important',
      margin: 5
    }
}));

export default function Home(props){
    const classes = useStyles();

    const data = my;

    return (
        <div className={classes.root}>
                <GridList className={classes.gridList} spacing={0} cols={2.1}>
                    {data.map((fish) => (
                        <GridListTile className={classes.gridListTile} key={fish.nome}>
                            <Card 
                                title={fish.nome} 
                                subTitle={fish.familia} 
                                urlImage={fish.imageUrl}
                                description={fish.alimentacao}
                                callback={() => {}} />
                        </GridListTile>
                    ))}
                </GridList>
        </div>
    );
}
