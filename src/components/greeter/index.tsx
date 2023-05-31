import React from 'react'
import greeterProps from './types';

const Greeter: React.FC<greeterProps> = ({name}) => {
  return (
    <div>Hey! Hello {name} long time no see.</div>
  )
}

export default Greeter;