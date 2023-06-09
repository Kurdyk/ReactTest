import ButtonComponent from 'components/button'
import Greeter from 'components/greeter'
import React from 'react'
import SwitchableComponent from 'utils/switchableComponent'
import { useData } from './hook'

const RoadComponent: React.FC = () => {

    // const {columns, roads} = useData();

    return (
        <SwitchableComponent 
            components={[{element:<ButtonComponent text={'lolol'} />, label:"button"},
                {element: <Greeter name={'toto'} />, label:"greeter"}]} 
            defaultComponent={0} 
        />)
}

export default RoadComponent