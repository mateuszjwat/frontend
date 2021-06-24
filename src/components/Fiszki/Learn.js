import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Card , ButtonGroup, Row, Col, Container} from 'react-bootstrap';
import { Button, ProgressBar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../css/Learn.css'
import useChangeTitle from '../ChangeTitle';


function FiszkaLearn (props){
    let history = useHistory();

    useChangeTitle("Fiszki-nauka");

    const [i, setI] = useState(0);
    const [wrong, setWrong] = useState([]);

    if(props.fiszka == null){
        history.push('/PublicFiszki');
        return <div></div> //to prevent error
    }

    let words = props.fiszka.fiszkaCards;
    console.log(words);
    console.log(words.length);

    function repeatMistakes(){
        let badWords = [];
        for(let j = 0; j < words.length; j++){
            if(wrong[j])
                badWords.push(words[j]);
        }
        
       
        let temp = {...props.fiszka};
        console.log(temp);
        temp.fiszkaCards = badWords;
        setI(0);
        setWrong([]);
        props.setFiszka(temp);
    }

    function next(){
        if(i < words.length - 1)
            setI(i + 1);
    }

    function previous(){
        if(i > 0)
            setI(i - 1);
    }

    function wrongAns(){
        let temp = {...wrong};
        if(temp[i])
            temp[i] = false;
        else
            temp[i] = true;
        setWrong(temp);
    }

    let end = <div></div>;
    if(i == words.length - 1){
        let b = false;
        for(var j = 0; j < words.length; j++){
            if(wrong[j])
                b = true;
        }
        if(b){
            end = (
                <div>
                    <LinkContainer to="/PublicFiszki">
                        <Button>Zakończ naukę</Button>
                    </LinkContainer>
                    <Button variant="outline-danger" onClick={repeatMistakes}>Powtórz błędy</Button>
                </div>
            );
        }
        else{
            end = (
                <LinkContainer to="/PublicFiszki">
                    <Button>Zakończ naukę</Button>
                </LinkContainer>
            );
        }
    }

    return (
        <div>
            <div style={{height:60}}></div>
            <Container fluid>
            <Row style={{display:'flex'}}>
                <Col style={{ display:'flex', justifyContent:'center' }}>
                <div style={{height:60}}></div>
                    
                        <div style={{ width: 300}}>
                            <ButtonGroup aria-label="Basic example">
                                {i == 0 ? <Button variant="light" disabled>Poprzedni</Button> : <Button variant="light" onClick={previous}>Poprzedni</Button>}
                                {i == words.length - 1? <Button variant="light" disabled>Następny</Button> : <Button variant="light" onClick={next}>Następny</Button>}
                            </ButtonGroup>
                            <ProgressBar animated now={100 / words.length * (i + 1)} />
                        </div>
                   
                </Col>
                <Col style={{ display:'flex', justifyContent:'center' }}>
                    <div style={{height:60}}></div>
                    <MakeCard card={words[i]}/>
                </Col> 
                <Col>
                    {end}
                </Col>
            </Row>
            </Container>
        </div>
    );


    function MakeCard({card}){

        console.log(card);

        let theme="secondary";
        let text="white";
        if(wrong[i]){
            text="dark";
            theme = "danger";
        }

        return (
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <Card bg={theme} text={text} style={{ width: 300, height: 300 }} className="addShadow">
                            <Card.Body>
                                <Card.Header>Nauka</Card.Header>
                                    <Card.Text className="align-items-center">
                                        <h4>{card["face"]}</h4>
                                    </Card.Text>    
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="flip-card-back">
                        <Card bg={theme} text={text} style={{ width: 300, height: 300 }} className="addShadow">
                            <Card.Body>
                                <Card.Header>Nauka</Card.Header>
                                    <Card.Text className="align-items-center">
                                        <h4>{card["reverse"]}</h4>
                                    </Card.Text>    
                            </Card.Body>
                            <Card.Footer> 
                                <Button className="button-learn" onClick={wrongAns} variant="danger">powtórz</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default FiszkaLearn;