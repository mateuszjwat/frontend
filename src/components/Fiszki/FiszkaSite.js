import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FiszkaApi from './FiszkaApi';
import { Card , Row, Spinner, Col, Table} from 'react-bootstrap';
import { Button , ButtonGroup, Jumbotron} from 'react-bootstrap';
import Additional from './Additional';
import { blue, lightBlue } from '@material-ui/core/colors';



function FiszkaSite (props){
    let history = useHistory();

    const [cards, setCards] = useState(null);

    function handleNauka(){
        history.push('/fiszkaLearn');
    }

    function handleTest(){
        history.push('/fiszkaTest');
    }

    function handleGame(){
        history.push('/game');
    }

    function flipWords(){
        let fiszka = {...props.fiszka};
        for(let i = 0; i < fiszka.fiszkaCards.length; i++){
            [fiszka.fiszkaCards[i].face, fiszka.fiszkaCards[i].reverse] = [fiszka.fiszkaCards[i].reverse, fiszka.fiszkaCards[i].face]
        }
        props.setFiszka(fiszka);
    }

    if(props.fiszka == null){
        history.push('/PublicFiszki');
        return <div></div> //to prevent error
    }
    else{
        let words = props.fiszka.fiszkaCards;
        return (

            <div>
                <div style={{height:60}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Card style={{ width: '30rem' }} className="addShadow">
                        <Card.Body>
                            <Card.Title>{props.fiszka.title}</Card.Title>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <th>Słowo</th>
                                    <th>Znaczenie</th>
                                </thead>
                                <tbody>
                                    {words.map(word => {
                                        return(
                                                <tr>
                                                <td>{word.face}</td>
                                                <td>{word.reverse}</td>
                                                </tr>             
                                        );
                                    })}
                                </tbody>           
                            </Table>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" onClick={handleNauka}>
                                    Nauka
                                </Button>
                                <Button variant="secondary" onClick={handleGame}>
                                    Graj
                                </Button>
                                <Button variant="secondary" onClick={handleTest}>
                                    Test
                                </Button>
                            </ButtonGroup>
                            <Button className="float-right" onClick={flipWords}>Odwróć słowa</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{height:40}}></div>

                <Additional setFiszka={props.setFiszka}/>

            </div>
        );
    }
}
  
export default FiszkaSite;