import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import CharacterContainer from './components/marvels/CharacterContainer';
import axios from 'axios';
import { notification } from 'antd'

export const UserContext = React.createContext();
const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async() => {
      try{
        let baseUrl = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_KEY}`;
        let result = await axios(baseUrl);
        setItems(result.data.data.results)
      } catch(ex) {
        setItems([]);
        notification.error({
          message: 'Failed to fetch marvel characters',
          description: ex.message,
          placement: 'top',
        });
      } finally {
        setIsLoading(false)
      }   
    }

    fetchCharacters();
  }, []);

  return (
    <div className="container">
      <UserContext.Provider value={items}>
        <Header/>
        <CharacterContainer items={items} isLoading={isLoading}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
