import { useEffect, useState  } from 'react'
import { buttonStore, useStore } from './utils/store' 
import "./App.css"


const ButtonContainer = () => {
  const countState = useStore(buttonStore)(state=> state.count) as any;
  return (
  <div className="container col">
    <h1 className="title">Buttons</h1>
    <h2>{countState}</h2>
    <div className="container">


      <button className="pad" onClick={()=> {
      buttonStore.setState("count", countState + 1)
      }}>Increase</button>
      <button className="pad" onClick={() => {}}>Decrease</button>
 </div>
  </div>
  )
}

const StopWatch = () => {

  const [count, setCount] = useState(0)
  useEffect(
    () => {
      const t = setInterval(() => setCount((count) => count + 1), 500);
      return () => clearInterval(t);
    }, 
    []);

  return (
  <div className="container col"><h1 className="title">StopWatch</h1><div>{count}</div></div>
  )
}
function App() {

  return (
    <div className="main container col">
      <StopWatch />
      <ButtonContainer />
   </div>
  )
}

export default App
