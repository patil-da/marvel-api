import React from 'react';
import MarvelCharacter from './MarvelCharacter';
import { Col, Row, Input, Pagination, Select } from 'antd';
const { Option } = Select;

const CharacterTable = ({
    characters, 
    searchText, 
    pageIndex, 
    pageSize, 
    onPageChange, 
    setSearchText, 
    onSortSelect}) => {

  const getPaginatedCharacters = () => {
    return characters.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  }

  return (
    <>
      <div className='option-container'>
        <div className='search-character'>
          <Input placeholder='Search characters' 
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}/>
        </div>
        <Select defaultValue="name" 
                style={{ width: 250 }} 
                onChange={onSortSelect}>
          <Option value="name">Sort by Name</Option>
          <Option disabled>Sort by available count Max to Min</Option>
          <Option value="comics">Sort by Comics</Option>
          <Option value="series">Sort by Series</Option>
          <Option value="stories">Sort by Stories</Option>
        </Select>
      </div>
      
      {characters.length === 0 ? <p>Data not available</p> :
      <>
        <Row gutter={[32, 32]}>
          {getPaginatedCharacters().map(character => 
            <Col xs={24} sm={12} lg={6} key={character.id}>
              <MarvelCharacter character={character}/>
            </Col>
            )}
        </Row>
        
        <div className='pagination'>
          <Pagination defaultCurrent={1} defaultPageSize={4} total={characters.length} current={pageIndex} onChange={onPageChange}/>
        </div>
      </>}
    </>
  )
}

export default CharacterTable;
