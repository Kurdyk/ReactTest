import React from 'react'
import { FruitListProps } from './type'
import { Fruit } from './type'
import { List, Typography } from '@mui/material'

const FruitItem: React.FC<Fruit> = ({name}) => {
    return (
        <Typography color="secondary"> {name} </Typography>
    )
}

const FruitListComponent: React.FC<FruitListProps> = ({fruitList}) => {
  return (
    <List> 
        {fruitList.map(({name}, index) => {return <FruitItem key={index} name={name} />})}
    </List> // with deconstruction
  )
}

export default FruitListComponent