import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import Fab from '../../../components/fab/index';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '../../../components/card/index';
import { makeStyles } from '@material-ui/core/styles';
import {mockOfData} from '../../../utils/fish';
import Typography from '@material-ui/core/Typography';

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
    },
}));
const writeJsonFile = require('write-json-file');

export default function Home(props){
    const [isSelected, setSelected] = useState(false);
    const [data, setData] = useState([]);

    const classes = useStyles();

    const mock = mockOfData;
    const icon = <DoneIcon />;
    const clearIcon = <ReplayIcon />;

    function callback(fish){
        setSelected(true);
        data.push(fish);
        const newData = data;
        setData(newData);
    }

    function clear(){
        setData([])
    }

    async function finish(){
        await writeJsonFile('foo.json', {foo: true});
    }

    return (
        <div className={classes.root}>
                <GridList className={classes.gridList} spacing={0} cols={2.5}>
                    {mock.map((fish) => (
                        <GridListTile className={classes.gridListTile} key={fish.nome}>
                            <Card 
                                title={fish.nome} 
                                fish={fish}
                                subTitle={fish.familia} 
                                urlImage={fish.imageUrl}
                                description={fish.alimentacao}
                                callback={callback} />
                        </GridListTile>
                    ))}
                </GridList>
                {isSelected ? <div>
                    <Fab name="clear" label="clear" color="primary" isLeft={true} callback={clear} icon={clearIcon} />
                    <Fab name="add" label="add" color="primary" isLeft={false} icon={icon} callback={finish}/>  </div>
                : <div/>}
        </div>
    );
}
