import {Button, Card} from 'react-bootstrap'  
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import LoginFetch from './LoginFetch';


function SignUp (props){

    let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorForm, setErrorForm] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault();
        LoginFetch.register(email, username, password).then((response) => {
            if(response.status == 200){
                history.push('/login');
            }
        }).catch(err => {
            console.log(err.response.data);
        });
    };

    if(!props.user){
        return (
            <div>
                <div style={{height:40}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                <Card style={{ width: '30rem' }}>
                    <Card.Header>Zarejestruj się!</Card.Header>
                    <Card.Body>
                        <form onSubmit={handleLogin} autocomplete="on">
                            <h3 class='text-center'>Stwórz nowe konto!</h3>
                            <br/>

                            <div className="form-group">
                                <label>Wpisz adres email</label>
                                <input type="email" className="form-control" placeholder="adres email" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-group" autoComplete="on">
                                <label>Wpisz username</label>
                                <input type="username" className="form-control" placeholder="username"  onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Wpisz hasło</label>
                                <input type="password" className="form-control" placeholder="hasło"  onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button className="btn btn-primary btn-block" type="submit">Zarejestruj się</button>
                        </form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
    else 
        return <div></div>;
}
  
export default SignUp;