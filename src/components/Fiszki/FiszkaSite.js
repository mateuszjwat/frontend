import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import {MyFetch} from '../CustomFetch'
import FiszkaApi from './FiszkaApi';
import { Card , Form, Spinner, ListGroup, Table} from 'react-bootstrap';
import { Button , ButtonGroup} from 'react-bootstrap';
  
function FiszkaSite (props){
    let history = useHistory();

    function handleNauka(){
        history.push('/fiszkaLearn');
    }

    if(props.fiszka == null){
        history.push('/PublicFiszki');
        return <div></div> //to prevent error
    }
    else{
        let words = props.fiszka.fiszkaCards;
        return (
            <div  className="p-3 mb-2 bg-light text-dark">
                <div style={{height:60}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Card style={{ width: '30rem' }}>
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
                                <Button variant="secondary">
                                    Graj
                                </Button>
                                <Button variant="secondary">
                                    Test
                                </Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </div>

                
            </div>
        );
    }
}
  
export default FiszkaSite;