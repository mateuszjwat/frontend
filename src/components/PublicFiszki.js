import React from 'react';
import { useState } from 'react';
import {Card, Button, Carousel, Row, Col, Spinner} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
import FiszkaApi from './Fiszki/FiszkaApi';
  
function PublicFiszki (props){
    const [items, setItems] = useState(null);
    let history = useHistory();

    function chooseSet(fiszka){
      console.log(fiszka);
      props.setFiszka(fiszka);
      history.push('/fiszkaSite');
    }

      if (items == null) {
        FiszkaApi.getPublic().then(res => {
          setItems(res.data);
        })


        return (
        <div>
          <MyCarousel/>
          Loading...
          <Spinner animation="border" role="status"></Spinner>
          
        </div>);
      } else {

        const cards = items.map(item => (
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
              <MyCarousel/>
              <BuildCards cards={cards}/>
          </div>
        );
      }
}

function MyCarousel(){
  return (
      <Carousel class="text-light bg-dark">
        <Carousel.Item class="text-light bg-dark">
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3>Welcome to Fiszki!</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3>Choose your favourite</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3>Have fun :D</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>);
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
  
export default PublicFiszki;