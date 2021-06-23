import React from 'react';
import { useState } from 'react';
import {Button, Card} from 'react-bootstrap'
import LoginFetch from './LoginFetch';
import { Alert } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import useChangeTitle from '../ChangeTitle';


function Login (props){

    let history = useHistory();

    useChangeTitle("Fiszki Login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorForm, setErrorForm] = useState(false);


    function handleLogin(e){
        e.preventDefault();
        LoginFetch.login(username, password).then(response => {
            let newUser = {
                username: username,
                token: response.data.token
            }

            props.setUser(newUser);
            history.push('/');
            console.log(newUser.token);
        }).catch(err => {
            setErrorForm(true);
            console.log("złe passwordy");
        });
    }

    if(!props.user){
        return (
            <div>
                <div style={{height:40}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                <Card style={{ width: '30rem' }}>
                    <Card.Header>Witaj!</Card.Header>
                    <Card.Body>
                        <form className="login-form" onSubmit={handleLogin} autoComplete="on">
                            <h3 class='text-center'>Zaloguj się</h3>

                            <div className="form-group">
                                <label>Wpisz Username</label>
                                <input type="username" className="form-control" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Wpisz Hasło</label>
                                <input type="password" className="form-control" placeholder="hasło" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button value="Login" type="submit" className="btn btn-primary btn-block">Submit</button>
                            {errorForm
                                ? <Alert variant="danger"> Złe dane logowania! </Alert>
                                : <br/>
                            }
                            
                            <p className="forgot-password text-right">
                                Nie masz konta? 
                                <a href="/signUp">Zarejestruj się</a>
                            </p>
                        </form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
    else {
        return <div></div>

    }
}
  
export default Login;