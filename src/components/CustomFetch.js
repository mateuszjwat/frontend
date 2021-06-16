import { useState, useEffect } from 'react';


export const MyFetch = (url, setItems) => {
    useEffect(() => {
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              setItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log("ERRROR");
            }
          )
      }, [])
}