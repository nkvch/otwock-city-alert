import styled from '@emotion/styled'
import { useState } from 'react'
import './App.css'
import Map from './Components/Map/Map';

const MapHolder = styled.div`
  width: 700px;
  height: 400px;
  border: 4px solid black;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Map />
    </>
  )
}

export default App
