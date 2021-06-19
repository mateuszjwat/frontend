import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
  
function Home (props){

    let welcome;
    if(props.user){
        welcome = <h1 class="display-2">Witaj ponownie {props.user.username}</h1>
    } else {
        welcome = <h1 class="display-2">Witaj na najlepszej stronie z fiszkami!</h1>
    }

    function Zaleta() { 
        return(
            <div class="album py-5 bg-light">

            <div class="row" style={{display: 'flex', justifyContent: 'center'}}>
                <div class="col-md-10">
                <div class="card mb-4 shadow-sm">
                    <svg
                    class="bd-placeholder-img card-img-top text-center"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    >
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text class="h2" fill="#eceeef" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
                        Thumbnail
                    </text>
                    
                    </svg>
                    <div class="card-body">
                    <p class="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>

        );
    }

    return (
    <div>
        <Jumbotron>
            {welcome}
        </Jumbotron>
        
        <h1 class="text-center display-4" style={{height:130}}> Zalety fiszek</h1>
 
        <Row sm="1" xs="1" md="3">
        <Col><Zaleta/></Col>
        <Col><Zaleta/></Col>
        <Col><Zaleta/></Col>
        </Row>



    </div>
    );
}
  
export default Home;