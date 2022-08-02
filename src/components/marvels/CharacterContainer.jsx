import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import CharacterTable from './CharacterTable';
import { Spin } from 'antd';

const CharacterContainer = ({items, isLoading}) => {
    const [characters, setCharacters] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [sortValue, setSortValue] = useState('name');

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        let filtered = items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        sortAndUpdateCharacters(filtered, sortValue);
    }, [items, searchText, sortValue]);

    const onPageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    }

    const onSortSelect = (value) => {
        setSortValue(value);
        sortAndUpdateCharacters(characters, value);
    }

    const sortByName = (first, second) => {
        return first.name > second.name ? 1 : second.name > first.name ? -1 : 0;
    }

    const sortByAvailableCount = (first, second, value) => {
        return first[value].available > second[value].available ? 1 : second[value].available > first[value].available ? -1 : 0
    }

    const sortAndUpdateCharacters = (list, value) => {
        if(list.length === 0) {
            return;
        }
        if(value === 'name') {
            let sorted = list.sort(sortByName).map(item => item);
            setCharacters(sorted);
        } else {
            let sorted = list.sort((first, second) => sortByAvailableCount(first, second, value)).map(item => item);
            setCharacters(sorted);
        }
        setPageIndex(1);
    }

    return(
        <>
          <Layout>
            {isLoading ? 
                <div className='loading-spin-container'>
                    <Spin size="large" />
                    <h1 style={{marginLeft: '20px'}}>Loading...</h1>
                </div> :
                    <div className='routes'>
                        <Routes>
                            <Route exact path='/' 
                                element={<CharacterTable characters={characters} 
                                                    pageIndex={pageIndex} 
                                                    pageSize={pageSize} 
                                                    onPageChange={onPageChange}
                                                    searchText={searchText}
                                                    setSearchText={text => setSearchText(text)}
                                                    onSortSelect={onSortSelect}/>}/>
                            <Route exact path='/character/:characterId' element={<CharacterDetails/>}/>
                        </Routes>
                    </div>
            }
        </Layout>
        </>
    );
}

export default CharacterContainer;