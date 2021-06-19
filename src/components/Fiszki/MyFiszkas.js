import React from 'react';
import { useState } from 'react';
import {Card, Button, Tooltip, OverlayTrigger, Row, Col, Spinner} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
import FiszkaApi from './FiszkaApi';
import { Jumbotron , ButtonGroup} from 'react-bootstrap';
  
function MyFiszkas (props){
    const [items, setItems] = useState(null);
    const [uploaded, setUploaded] = useState([]);

    let history = useHistory();
    if(!props.user){
        history.push('/login');
    }

    if(items == null)    
        FiszkaApi.myFiszkas(props.user.token).then(res => {
            setItems(res.data);   
        });
    
    function deleteSet(id){
        FiszkaApi.deleteFiszkaSet(props.user.token, id).then(res => {
            FiszkaApi.myFiszkas(props.user.token).then(res => {
                setItems(res.data);   
            });
        });
    }

    function uploadSet(id){
        FiszkaApi.publishFiszkaSet(props.user.token, id).then(res => {
            if(res.status == 200){
                let v = {};
                v[id] = true;
                setUploaded(v);
           }
       });
    }

    function chooseSet(fiszka){
        console.log(fiszka);
        props.setFiszka(fiszka);
        history.push('/fiszkaSite');
    }


    if (items == null) {
    return (
    <div>
        Loading...
        <Spinner animation="border" role="status"></Spinner>
    </div>);
    } else if (items.length == 0){
        return (
            <Jumbotron>
                <LinkContainer to="/addFiszka">
                <a>Stwórz nowy zestaw!</a>
                </LinkContainer>
            </Jumbotron>
        );
    } else {
    const cards = items.map(item => (
            <Card style={{width:'auto'}}>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <ButtonGroup>
                    <Button
                        onClick={() => chooseSet(item)}
                        variant="outline-dark"
                        size="lg">
                        Wybierz zestaw
                    </Button>
                    <Button
                        onClick={() => deleteSet(item.id)}
                        variant="outline-dark"
                        size="lg">
                        Usuń zestaw
                    </Button>
                    <OverlayTrigger
                        placement="bottom"
                        show={uploaded[item.id]? true : false}
                        overlay={<Tooltip>Zestaw upubliczniono!</Tooltip>}>
                        <Button
                            onClick={() => uploadSet(item.id)}
                            variant="outline-dark"
                            size="lg">
                            Upublicznij zestaw
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </Card.Body>
                
            </Card>
        ));

        return (
            <div>
                <Jumbotron>
                    <LinkContainer to="/addFiszka">
                    <a>Stwórz nowy zestaw!</a>
                    </LinkContainer>
                </Jumbotron>
                <BuildCards cards={cards}/>
            </div>
        );
    }
}


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
  
export default MyFiszkas;