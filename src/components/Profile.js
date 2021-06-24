import axios from "axios";
import { useState, useEffect } from 'react';
import { Card, ListGroup, Table, ProgressBar, Row, Col, Container} from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import {useHistory} from 'react-router-dom'
import useChangeTitle from "./ChangeTitle";

const API_URL = "https://test-app-demo-my.herokuapp.com/api/user/"

function makeHeader(token){
    const header = {
        headers:{
        'Authorization': 'Bearer '+token
        }
    }
    return header;
}

function getProfile(token){
    return axios.get(API_URL + "profile", makeHeader(token));
}


function Profile (props){
    const [data, setData] = useState(null);

    useChangeTitle("Fiszki Profil");
    let history = useHistory();


    useEffect(() => {
        getProfile(props.user.token).then(res=>{
            setData(res.data);
            console.log(res.data);
        })
      }, []);

    function handleCards(){
        history.push('/myFiszkas');
    }

    if(data){
        let good = 0;
        let wrong = 0;
        let s = data.statistics;
        let mine = data.myFiszkaSets;
        let noPrivate = false;

        for(let i = 0; i < mine.length; i++){
            good += mine[i].lastGood;
            wrong += mine[i].lastWrong;
        }

        if(wrong == 0 && good == 0){
            console.log("wejszło");
            noPrivate = true;
        }

        for(let i = 0; i < s.length; i++){
            good += s[i].goodAns;
            wrong += s[i].wrongAns;
        }

        const donat = {
            labels: [
              'Złe odpowiedzi',
              'Dobre odpowiedzi'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [wrong, good],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 255, 36)',
              ],
              hoverOffset: 4
            }]
          };


        return(
            <div>
            <div style={{height:60}}></div>

            <Container  fluid>
                <Row>
                    <Col md={4} xs={12}>
                        <Card  >
                        <Card.Header><b>Username:</b> {data.username}</Card.Header>
                        <Card.Header> <b>Email:</b> {data.email}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item action onClick={handleCards}>Ilość zestawów prywatnych: {data.myFiszkaSets.length}</ListGroup.Item>
                            <ListGroup.Item>
                                Odpowiedzi łącznie:
                                <Doughnut data={donat} />
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                    </Col>


                    <Col md={4}>
                        <Card >
                            <ListGroup>
                        
                            {data.statistics.length > 0 && 
                                <ListGroup.Item>
                                Statystyki fiszek publicznych:
                                <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                            <th>Nazwa Zestawu</th>
                                            <th>Ilość odpowiedzi dobrych i złych</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.statistics.map(stat => {
                                            let all = stat.wrongAns + stat.goodAns;
                                            let good = 100 / all * stat.goodAns;
                                            let wrong = 100 / all * stat.wrongAns;

                                            return(
                                            <tr>
                                                <td>{stat.setName}</td>
                                                <td>
                                                Dobrych: {stat.goodAns}, Złych: {stat.wrongAns}
                                                <ProgressBar>
                                                    <ProgressBar striped animated={true} variant="success" now={good} />
                                                    <ProgressBar striped animated={true} variant="danger" now={wrong} />
                                                </ProgressBar>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                        </tbody>
                                </Table>
                                </ListGroup.Item>
                            }
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup>

                            {!noPrivate && 
                            <ListGroup.Item>
                                Statystyki fiszek prywatnych:
                                <Table striped bordered hover variant="dark">  
                                        <thead>
                                            <tr>
                                            <th>Nazwa Zestawu</th>
                                            <th>Ilość odpowiedzi dobrych i złych</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.myFiszkaSets.map(stat => {
                                            if(stat.lastGood != 0 || stat.lastWrong != 0){
                                                let all = stat.lastWrong + stat.lastGood;
                                                let good = 100 / all * stat.lastGood;
                                                let wrong = 100 / all * stat.lastWrong;

                                                return(
                                                <tr>
                                                    <td>{stat.title}</td>
                                                    <td>
                                                    Dobrych: {stat.lastGood}, Złych: {stat.lastWrong}
                                                    <ProgressBar>
                                                        <ProgressBar animated={true} striped variant="success" now={good} />
                                                        <ProgressBar  animated={true} striped variant="danger" now={wrong} />
                                                    </ProgressBar>
                                                    </td>
                                                </tr>
                                                );
                                            }
                                        })}        
                                        </tbody>
                                    </Table>
                            </ListGroup.Item>
                            }
                        </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
    else   
        return <div></div>
}
  
export default Profile;