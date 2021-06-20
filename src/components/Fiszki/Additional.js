import FiszkaApi from "./FiszkaApi";
import { Row, Col, Card, Jumbotron, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import { useState, useEffect } from "react";

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

function Additional({setFiszka}){
    let history = useHistory();
    const [content, setContent] = useState(<div></div>);
    const [uploaded, setUploaded] = useState(false);

    console.log(uploaded);

    useEffect(() => {
        FiszkaApi.getPublic().then(res => {

            console.log("im here");
            let c = res.data;
            if(c.length > 3){
                c = getRandom(c, 3);
            }

            function chooseSet(fiszka){
                console.log(fiszka);
                setFiszka(fiszka);
                history.push('/fiszkaSite');
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
                        Wybierz zestaw
                    </Button>
                </Card.Body>
                    <footer className="blockquote-footer pull-right">
                        <small className="text-muted">
                        {item.owner}
                        </small>
                    </footer>
                </Card>
            ));
                
            console.log("im here 2 ");
            setUploaded(true);
            setContent (
                <div>
                    <Jumbotron>
                        <h4>
                            Inne zestawy, które mogą ci się spodobać ^^
                        </h4>
                    </Jumbotron>
                    <BuildCards cards={cardSet}/>
                </div>
            );
            
        });
    }, []);
    
    return content
}

export default Additional;