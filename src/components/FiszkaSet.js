import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import {MyFetch} from './CustomFetch'
  
function FiszkaSet (){
  const [fiszka, setFiszka] = useState(null);

  let {id} = useParams();
  let history = useHistory();

  if(id == null){
    history.push('/PublicFiszki');
    return <div></div> //to prevent error
  }
  else{
    MyFetch(`https://60c928797dafc90017ffc3bc.mockapi.io/api/fiszka/${id}`, setFiszka);

    if(fiszka == null){
      return <div>Loading...</div>;
    } else 
    return (
      <div>
        to fiszka here <br/>
        {fiszka.title}
      </div>
      );
  }
}
  
export default FiszkaSet;