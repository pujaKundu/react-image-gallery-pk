import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {imagesData } from './constants/images'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {imagesData.map((image) => (
        <div key={image.id}>
          <img src={image.url} alt={`Image ${image.id}`} />
        </div>
      ))}
    </>
  );
}

export default App
