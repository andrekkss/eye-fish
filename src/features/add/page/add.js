import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '../../../components/fab/index';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '../../../components/card/index';
import { makeStyles } from '@material-ui/core/styles';
import { mockOfData } from '../../../utils/index';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100% !important',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: "#f2f2f2",
    },
    gridList: {
      width: '100% !important',
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      overflow: 'hidden'
    },
    gridListTile: {
      height: '60% !important',
      margin: 4
    }
}));

export default function Home(props){
    const classes = useStyles();

    const data = mockOfData;
    const icon = <AddIcon />;

    return (
        <div className={classes.root}>
            <div>
                <GridList className={classes.gridList} spacing={0} cols={2.5}>
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
            <Fab name="add" label="add" color="primary" icon={icon} />
        </div>
    );
}
