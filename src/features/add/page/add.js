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

    const data = mockOfData;
    const icon = <AddIcon />;

    return (
        <div className={classes.root}>
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
            <Fab name="add" label="add" color="primary" icon={icon} />
        </div>
    );
}
