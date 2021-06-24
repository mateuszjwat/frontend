import React from 'react';
import { useState, useEffect } from 'react';
import {Card, Button, Carousel, Row, Col, Spinner} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
import FiszkaApi from './Fiszki/FiszkaApi';
import useWindowDimensions from './WindowsDim';
import BuildCards from './Fiszki/BuildCards';
import useChangeTitle from './ChangeTitle';

function PublicFiszki (props){
    const [items, setItems] = useState(null);
    const {height, width} = useWindowDimensions();
    let history = useHistory();
    useChangeTitle("Fiszki publiczne");

    function chooseSet(fiszka){
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
          <Card style={{width:'auto'}} className="addShadow">
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

        return (
          <div>
              <MyCarousel/>
              <BuildCards cards={cards} width={width}/>
          </div>
        );
      }
}

function MyCarousel(){
  return (
      <Carousel class="text-light bg-dark">
        <Carousel.Item class="text-light bg-dark">
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3> Witaj w świecie fiszek!</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3>Wybierz swoje ulubione</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption class="text-light bg-dark" style={{textAlign: "center"}}>
            <h3>Baw się :D</h3>
            <p><br/></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>);
}

export default PublicFiszki;