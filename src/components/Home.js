import React from 'react';
  
function Home (props){
    console.log("z home'a");

    return (
    <div>
        <h1>Welcome to the world of Geeks!</h1>
        <div>
            Użytkownik jest teraz <b>{props.user.loggedIn ? 'zalogowany' : 'niezalogowany'}</b>.
        </div>
    </div>
    );
}
  
export default Home;