import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Collapse } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { UserContext } from '../../App';

const { Panel } = Collapse;

 const CharacterDetails = () => {
    const { characterId } = useParams();
    const [selectedSection, setSelectedSection] = useState('1');

    const onPanelSelected = (key) => {
        setSelectedSection(key);
    };
  
    return (
    <React.Fragment>
        <div>
            <Link to='/'>
                <Button><CaretLeftOutlined /> Back</Button>
            </Link>
            <UserContext.Consumer>
                {
                    items => {
                        let charId = Number.parseInt(characterId)
                        let character = items.find(item => item.id === charId);
                        if(character === undefined) {
                            return null;
                        }
                        return(
                            <>
                                <div className='character-details-container'>
                                    <div className='character-profile'>
                                        <div>
                                            <h1>{character.name}</h1>
                                            <p>{character.description}</p>
                                        </div>
                                    </div>
                                    <div className='character-image'>
                                        <img src={character.thumbnail.path + "/landscape_incredible.jpg"} alt='' />
                                    </div>
                                </div>
                                <Collapse defaultActiveKey={['1']} 
                                        activeKey={selectedSection} 
                                        onChange={onPanelSelected}
                                        accordion={true}>
                                    <Panel header="Series" key="1">
                                        <div className='details-panel'>
                                            <ol>
                                                {character.series.items.map(item => <li key={item.key}>{item.name}</li>)}
                                            </ol>
                                        </div>
                                    </Panel>
                                    <Panel header="Stories" key="2">
                                        <div className='details-panel'>
                                            <ol>
                                                {character.stories.items.map(item => <li key={item.key}>{item.name}</li>)}
                                            </ol>
                                        </div>
                                    </Panel>
                                    <Panel header="Events" key="3">
                                        <div className='details-panel'>
                                            <ol>
                                                {character.events.items.map(item => <li key={item.key}>{item.name}</li>)}
                                            </ol>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </>
                        )
                    }
                }
            </UserContext.Consumer>
            </div>
    </React.Fragment>
  )
}

export default CharacterDetails;
