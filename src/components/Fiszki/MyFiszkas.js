import React from 'react';
import { useState, useEffect } from 'react';
import {Card, Button, Tooltip, OverlayTrigger, Row, Col, Spinner} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
import FiszkaApi from './FiszkaApi';
import { Jumbotron , ButtonGroup, ProgressBar} from 'react-bootstrap';
import useWindowDimensions from '../WindowsDim';
import BuildCards from './BuildCards';
import useChangeTitle from '../ChangeTitle';
  
function MyFiszkas (props){
    const [items, setItems] = useState(null);
    const [publicFiszkas, setPublicFiszkas] = useState(null);
    const [uploaded, setUploaded] = useState([]);
    const {height, width} = useWindowDimensions();

    useChangeTitle("Moje fiszki");

    let history = useHistory();
    if(!props.user){
        history.push('/login');
    }
    

    useEffect(() => {
        FiszkaApi.getPublic().then(res => {
            setPublicFiszkas(res.data);
        });
        if(props.user){
            FiszkaApi.myFiszkas(props.user.token).then(res => {
                setItems(res.data);   
            });
        }
    }, []); 
        
    
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

    function deUploadSet(id){
        FiszkaApi.unPublishFiszkaSet(props.user.token, id).then(res => {
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


    if (items == null || publicFiszkas == null) {
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
        console.log(publicFiszkas);
    const cards = items.map(item => {

        let progress = <div></div>;
        if(item.lastGood > 0 || item.lastWrong > 0){
            console.log("pykło dla" + item.title);  
            let all = item.lastGood + item.lastWrong;

            progress = <ProgressBar>
                            <ProgressBar striped animated={true} variant="success" now={100 / all * item.lastGood} />
                            <ProgressBar striped animated={true} variant="danger" now={100 / all * item.lastWrong} />
                        </ProgressBar>
        }

        let isPrivate = true;

        for(let i = 0; i < publicFiszkas.length; i++){
            if(publicFiszkas[i].template_id == item.id)
                isPrivate = false;
        }
        
        return(
            <div className="fiszkas">
            <Card className="addShadow">
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <ButtonGroup size="sm">
                    <Button
                        onClick={() => chooseSet(item)}
                        variant="outline-dark"
                        >
                        Wybierz zestaw
                    </Button>
                    <Button
                        onClick={() => deleteSet(item.id)}
                        variant="outline-dark"
                        >
                        Usuń zestaw
                    </Button>
                    {isPrivate ? 
                        <OverlayTrigger
                            placement="bottom"
                            show={uploaded[item.id]? true : false}
                            overlay={<Tooltip>Zestaw upubliczniono!</Tooltip>}>
                            <Button
                                onClick={() => uploadSet(item.id)}
                                variant="outline-dark"
                                >
                                Upublicznij zestaw
                            </Button>
                        </OverlayTrigger>
                        :
                        <OverlayTrigger
                            placement="bottom"
                            show={uploaded[item.id]? true : false}
                            overlay={<Tooltip>Zestaw odpubliczniono!</Tooltip>}>
                            <Button
                                onClick={() => deUploadSet(item.id)}
                                variant="outline-dark"
                                >
                                Odpublicznij zestaw
                            </Button>
                        </OverlayTrigger>
                    }
                </ButtonGroup>
                <div style={{height:20}}></div>
                {(item.lastGood > 0 || item.lastWrong > 0) && progress }
            </Card.Body>
            </Card>
            </div>
        );
        });

        return (
            <div>
                <Jumbotron>
                    <LinkContainer to="/addFiszka">
                    <a>Stwórz nowy zestaw!</a>
                    </LinkContainer>
                </Jumbotron>
                <BuildCards cards={cards} width={width}/>
            </div>
        );
    }
}

  
export default MyFiszkas;