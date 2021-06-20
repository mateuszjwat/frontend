import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FiszkaApi from './FiszkaApi';
import { Card , ButtonGroup, Row, Col, Container, ListGroup} from 'react-bootstrap';
import { Button, ProgressBar} from 'react-bootstrap';
import '../../css/Test.css'
import { Doughnut } from 'react-chartjs-2';
import { useRef } from 'react';
import useKeypress from 'react-use-keypress';


function FiszkaTest (props){
    let history = useHistory();

    const [i, setI] = useState(0);
    const [znaczenie, setZnaczenie] = useState("");
    const [nextButton, setNextButton] = useState(false);
    const [wrong, setWrong] = useState([]);

    useKeypress('Enter', () => {
        if(nextButton && i < words.length - 1){
            next();
        }
    });

    const inputElement = useRef(null);
    useEffect(() => {
        if (inputElement.current) {
        inputElement.current.focus();
        }
    }, []);

    if(props.fiszka == null){
        history.push('/PublicFiszki');
        return <div></div> //to prevent error
    }

    let words = props.fiszka.fiszkaCards;
    let cssInner = "";
    if(nextButton)
        cssInner = "test-flip-card-inner";

    function repeat(){
        setNextButton(false);
        setWrong([]);
        setI(0);
    }

    let end = <div></div>;
    let gAns = 0;
    let wAns = 0;
    for(let j = 0; j < words.length; j++){
        if(wrong[j])    
            wAns+=1;
    }
    gAns = words.length - wAns;

    function zakoncz(){
        if(props.user){
            let data = {
                setId: props.fiszka.id,
                setName: props.fiszka.title,
                goodAns: gAns,
                wrongAns: wAns
            }

            if(props.fiszka.template_id){
                FiszkaApi.uploadStatistics(props.user.token, data);
            } else {
                FiszkaApi.updatePrivate(props.user.token, data);
            }
        }
        history.push('/PublicFiszki');
    }

    function repeatMistakes(){
        let badWords = [];
        for(let j = 0; j < words.length; j++){
            if(wrong[j])
                badWords.push(words[j]);
        }
        
        zakoncz();
        let temp = {...props.fiszka};
        temp.fiszkaCards = badWords;
        props.setFiszka(temp);
        history.push('/fiszkaLearn');
    }

    function next(){
        setNextButton(false);
        setZnaczenie("");

        if(i < words.length - 1)
            setI(i + 1);
    }

    function wrongAns(){
        let temp = {...wrong};
        temp[i] = true;
        setWrong(temp);
    }

    function handleCheck(e){
        e.preventDefault();
        if(znaczenie != ""){
            if(znaczenie.toLowerCase() != words[i].reverse.toLowerCase()){
                wrongAns();
            }
            setZnaczenie("");
            setNextButton(true);
        }
    }

    if(i == words.length - 1 && nextButton){
        const data = {
            labels: [
              'Złe odpowiedzi',
              'Dobre odpowiedzi'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [wAns, gAns],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 255, 36)',
              ],
              hoverOffset: 4
            }]
          };

        end = (
            <div>
                <div style={{ width: 300}}>
                    <Doughnut data={data} />
                    <div style={{height:60}}></div>
                </div>
            </div>
        );
    }

    function MakeCard({card}){

        let theme="secondary";
        let text="white";
        if(wrong[i]){
            text="dark";
            theme = "danger";
        }

        return (
            <div class="test-flip-card">
                <div class={cssInner}>
                    <div class="test-flip-card-front">
                        <Card bg="secondary" text="white" style={{ width: 300, height: 300 }}>
                            <Card.Body>
                                <Card.Header>Test</Card.Header>
                                    <Card.Text className="align-items-center">
                                        <h4>{card["face"]}</h4>
                                    </Card.Text>
                                    <form>
                                    <ListGroup variant="dark">
                                        <ListGroup.Item variant="dark">
                                            <input text="text" placeholder="wpisz znaczenie" autoFocus value={znaczenie} ref={inputElement} onChange={e=>{setZnaczenie(e.target.value)}}>
                                            </input>
                                        </ListGroup.Item>  
                                        <ListGroup.Item variant="dark">
                                            <Button type="submit" variant = "dark" onClick={e => {handleCheck(e)}}>
                                                Check!
                                            </Button>
                                        </ListGroup.Item>  
                                    </ListGroup>
                                    </form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="test-flip-card-back">
                        <Card bg={theme} text={text} style={{ width: 300, height: 300 }}>
                            <Card.Body>
                                <Card.Header>Test</Card.Header>
                                    <Card.Text className="align-items-center">
                                        <h4>{card["reverse"]}</h4>
                                    </Card.Text>    
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
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
                            {i == words.length - 1 || nextButton == false? <Button variant="light" disabled>Następny</Button> : <Button variant="light" onClick={next}>Następny</Button>}
                            {i == words.length - 1 && nextButton? <Button variant="light" onClick={repeat}> Chesz powtórzyć? </Button>: <div></div>}
                        </ButtonGroup>
                        <ProgressBar animated now={100 / words.length * (i + 1)} />
                        <div style={{height:60}}></div>
                        {wAns > 0 && i == words.length - 1 && nextButton? 
                        <div>
                            <Button variant="danger" onClick={repeatMistakes}> Naucz się na błędach!</Button>
                        </div>
                        : <div></div>}
                        {i == words.length - 1 && nextButton? <Button variant="light" onClick={zakoncz}> Zakończ </Button>: <div></div>}
                    </div>
                       
                </Col>
                <Col style={{ display:'flex', justifyContent:'center' }}>
                    <div style={{height:60}}></div>
                    {MakeCard({card:words[i]})} 
                </Col> 
                <Col>
                    {end}
                </Col>
            </Row>
            </Container>
        </div>
    );
}
  
export default FiszkaTest;