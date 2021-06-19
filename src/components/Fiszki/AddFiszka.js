import React from 'react';
import { useState } from 'react';
import {Card, Button, Carousel, Row, Col, Spinner, ButtonGroup, Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
import FiszkaApi from './FiszkaApi';
import { Jumbotron } from 'react-bootstrap';
  
function AddFiszka (props){

    let history = useHistory();
    if(!props.user){
        history.push('/login');
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [inputList, setInputList] = useState([{ face: "", reverse: "" }]);

    function validate(){
        for(let i = 0; i < inputList.length; i++){
            if(inputList[i]["face"] == "" || inputList[i]["reverse"] == "")
                return false;
        }
        return true;
    }

    function upload(){
        if(title != "" && description != "" && validate()){
            let fiszkaSet = {
                title: title,
                description: description,
                cards: inputList
            }
            FiszkaApi.uploadFiszkaSet(props.user.token, fiszkaSet).then(res => {
                history.push('/myFiszkas');
            })
        } else {
            //TODO
        }
    }
   
    const handleInputChange = (e, index) => {
        const change = e.target.name;
        const list = [...inputList];
        list[index][change] = e.target.value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (e, index) => {
        e.preventDefault();
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { face: "", reverse: "" }]);
    };

    return(
        <div>
            <Jumbotron class="text-center">
                <h3>Stwórz swój zestaw!</h3>
            </Jumbotron>
            <div style={{ display:'flex', justifyContent:'center' }}>
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>Nowy zestaw</Card.Title>
                        <form>
                            <div className="form-group">
                                <label>Nazwa zestawu</label>
                                <input type="text" className="form-control" placeholder="wpisz nazwę zestawu" onChange={(e) => setTitle(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>opis zestawu</label>
                                <input type="text" className="form-control" placeholder="wpisz krótki opis zestawu" onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            
                            {inputList.map((x, i) => {
                                return (
                                <div className="box">

                                    <input type="text"
                                    name="face"
                                    value={x.face}
                                    placeholder="Wpisz słowo"
                                    onChange={e => handleInputChange(e, i)}
                                    />

                                    <input type ="text"
                                    name="reverse"
                                    value={x.reverse}
                                    className="ml10"
                                    placeholder="Wpisz znaczenie"
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <div >
                                    <ButtonGroup aria-label="Basic example">
                                    {inputList.length !== 1 && <Button variant="secondary" onClick={(e) => handleRemoveClick(e, i)}>usuń</Button>}
                                    {inputList.length - 1 === i && <Button variant="secondary" onClick={handleAddClick}>dodaj</Button>}
                                    </ButtonGroup>
                                    </div>
                                </div>
                                );
                            })}
                            
                            <div class="float-right">
                                <Button onClick={upload}>
                                    <Badge>Uploaduj zestaw!</Badge>
                                </Button>
                            </div>

                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}


  
export default AddFiszka;