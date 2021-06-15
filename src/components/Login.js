import React from 'react';
import {Button, Card} from 'react-bootstrap'  
import "../css/Login.css"


function Login (props){

    function testLog(){
        //nastąpi auth
        console.log("z funkci: " + props.user.loggedIn);

        props.setUser({...props.user, ["loggedIn"]: !props.user.loggedIn});
        console.log(props.user);
    }

    if(!props.user.loggedIn){
        return (
            <div>
                <div style={{height:40}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                <Card style={{ width: '30rem' }}>
                    <Card.Header>Welcome!</Card.Header>
                    <Card.Body>
                        <form>
                            <h3 class='text-center'>Sign In</h3>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="username" className="form-control" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            {/* remember me
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div> */}

                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            <br/>
                            <br/>
                            <p className="forgot-password text-right">
                                Don't have account? <a href="#">Sign in</a>
                            </p>
                        </form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
    else 
        return <div><Button variant="primary" style={{width: 100}} onClick={testLog}>TEST</Button></div>;
}
  
export default Login;