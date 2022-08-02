import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const MarvelCharacter = ({character}) => {
  return(
    <Link to={`/character/${character.id}`}>
      <Card cover={<img src={character.thumbnail.path + "/portrait_xlarge.jpg"} alt='' />}
            hoverable>
          <Meta title={character.name}
                description={character.description} />
      </Card>
    </Link>
  )
}

export default MarvelCharacter;
