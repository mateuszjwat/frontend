import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FiszkaApi from './FiszkaApi';
import { Card , Row, Spinner, Col, Table} from 'react-bootstrap';
import { Button , ButtonGroup, Jumbotron} from 'react-bootstrap';



function BuildCards({cards}){
    const resultsRender = [];
  
     for(let i = 0; i < cards.length; i+=4){
       resultsRender.push(
          <Row lg='4' md='1' sm='1' xs='1'>
          {
            cards.slice(i, i + 4)
              .map(card => (
                <Col>
                  {card}
                </Col>
              ))
          }
          </Row>
        );
     }
     return resultsRender;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function FiszkaSite (props){
    let history = useHistory();

    const [cards, setCards] = useState(null);

    function chooseSet(fiszka){
        console.log(fiszka);
        props.setFiszka(fiszka);
        history.push('/fiszkaSite');
    }

    function Additional(){
        if(cards == null)
            FiszkaApi.getPublic().then(res => {
                let c = res.data;
                console.log("tutaj z add");
                console.log(c);
                setCards(c);
            });
    
        if(cards != null){
            let c = cards;
            
            if(c.length > 3){
                c = getRandom(c, 3);
            }

            const cardSet = c.map(item => (
                <Card style={{width:'auto'}}>
                  {/*<Card.Img variant="top" src="holder.js/100px180" />  image placeholder*/}
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                      <Button
                        variant="outline-dark"
                        size="lg" onClick={() => chooseSet(item)}>
                        Choose Set
                      </Button>
                  </Card.Body>
                    <footer className="blockquote-footer pull-right">
                        <small className="text-muted">
                        {item.owner}
                        </small>
                    </footer>
                </Card>
              ));

            return (
                <div>
                    <div style={{height:60}}></div>
                    <Jumbotron>
                        <h4>
                            Inne zestawy, które mogą ci się spodobać ^^
                        </h4>
                    </Jumbotron>
                    <BuildCards cards={cardSet}/>
                </div>
            );
        }
        else
            return(
                <div>Loading...</div>
            );
    }

    function handleNauka(){
        history.push('/fiszkaLearn');
    }

    function handleTest(){
        history.push('/fiszkaTest');
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
                                <Button variant="secondary" onClick={handleTest}>
                                    Test
                                </Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </div>

                <Additional/>

            </div>
        );
    }
}
  
export default FiszkaSite;