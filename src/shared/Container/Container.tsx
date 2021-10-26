import React from 'react';
import './Container.css'

const Container: React.FC = (props) => {
  return <div className='ContainerApp'>
    { props.children }
  </div>
}

export default Container