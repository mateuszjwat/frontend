import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FiszkaApi from './FiszkaApi';
import { Card , ButtonGroup, Row, Col, Container} from 'react-bootstrap';
import { Jumbotron, ProgressBar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Additional from './Additional';
import useWindowDimensions from '../WindowsDim';
import BuildCards from './BuildCards';
import useChangeTitle from '../ChangeTitle';

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function Game (props){
    let history = useHistory();
    useChangeTitle("Fiszki-gra");

    const [wrong, setWrong] = useState([]);
    const [cards, setCards] = useState(null);
    const [selected, setSelected] = useState(null);
    const [content, setContent] = useState(<div></div>)
    const {height, width} = useWindowDimensions();

    if(props.fiszka == null){
        history.push('/PublicFiszki');
        return <div></div> //to prevent error
    }

    let allCards;

    if(cards == null){
        let words = props.fiszka.fiszkaCards;
        let faces = [];
        let reverses = [];
        words.map(word => {
            let face = {word: word.face, id: word.id, uniqId: "face"};
            let reverse = {word: word.reverse, id: word.id, uniqId: "reverse"};
            faces.push(face);
            reverses.push(reverse);
        });

        let all = faces.concat(reverses);
        shuffle(all);
        setCards(all);
    }

    else{
        allCards = cards.map((word) => {
            let theme="secondary";
            let text="white";

            if(selected)
            if(selected.word == word.word && selected.uniqId == word.uniqId){
                theme="primary";
            }

            if(wrong)
            if(wrong["word1"] == word.word || wrong["word2"] == word.word){
                text="dark";
                theme = "danger";
            }

            return (
                <a style={{ cursor: 'pointer' }} onClick={() => {handleClick(word)}}>
                    <Card bg={theme} text={text} style={{ width: 'auto' , height: 200}} className="addShadow" >
                        <Card.Header></Card.Header>
                        <Card.Body >
                                <Card.Text  className="align-items-center">
                                    <h4>{word.word}</h4>
                                </Card.Text>    
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </a>
            );
        })
    }

    if(allCards == null || cards == null){
        return <div></div>
    }
    else if(cards.length > 0)
    return (
        <div>
            <div style={{height:60}}></div>
            {BuildCards({cards:allCards, width:width})}
        </div>
    );
    else{
        return(
            <div>
                <Jumbotron>
                    <h1>
                        MOJE GRATULACJE
                    </h1>
                </Jumbotron>
                <Additional setFiszka={props.setFiszka}/>
            </div>
        )
    }
    
    function handleClick(word){
        if(selected == null){
            console.log("setting selected to " + word.word);
            setSelected(word);
            setWrong(null);
        }else{
            if(word.id == selected.id && selected.uniqId != word.uniqId){
                let c = cards;
                let index = c.indexOf(selected);
                c.splice(index, 1);
                index = c.indexOf(word);
                c.splice(index, 1);
            } else {
                setWrong({
                    word1: word.word,
                    word2: selected.word}
                    );
            }
            setSelected(null);
        }
    }
}


  
export default Game;