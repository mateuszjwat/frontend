import {Spinner, Card, Alert} from 'react-bootstrap'  
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import LoginFetch from './LoginFetch';
import useChangeTitle from '../ChangeTitle';


function SignUp (props){

    let history = useHistory();

    useChangeTitle("Fiszki sign up");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorForm, setErrorForm] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        LoginFetch.register(email, username, password).then((response) => {
            if(response.status == 200){
                history.push('/login');
            }
        }).catch(err => {
            setLoading(false);
            setErrorForm(true);
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
                        {loading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>}
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
                        {errorForm
                                ? <Alert variant="danger"> Username zajęty, lub zbyt krótkie hasło (min. 6 znaków)! </Alert>
                                : <br/>
                        }
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