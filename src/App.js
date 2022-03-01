import { useState, useEffect } from 'react'
import Top from "./Components/Top/Top";
import Bottom from "./Components/Bottom/Bottom";
import Home from "./Components/Home/Home";
import ReturnSelector from './Components/ReturnsSelector/ReturnSelector'
import ReturnsComplete from './Components/ReturnsComplete/ReturnsComplete';
import dummyData from './dummyData';


function App() {
  const [showScreen, setShowScreen] = useState('Home') 
  const [orderData, setOrderData] = useState([]) 
  const [finalOrderData, setFinalOrderData] = useState([])  

  function populateOrder(order){      
    setOrderData(order)     
    setShowScreen('ReturnSelector')
  }  

  function verifiedItemReturns(valid, finishedOrder){  
    if(valid){setShowScreen('ReturnsComplete')}   
    setFinalOrderData(finishedOrder)
  } 

  function HomePageReturn(){ setShowScreen('Home') }

  return (
    <div className="app h-screen">
      <div className='top h-1/8'>
        <Top />
      </div>
      <div className="app h-6/8">
        {showScreen === "Home" ? <Home getFinalisedOrder={populateOrder}/> : null}
        {showScreen === "ReturnSelector" ? <ReturnSelector loadOrder={dummyData} finalReturns={verifiedItemReturns}/> : null}
        {showScreen === 'ReturnsComplete' ?  <ReturnsComplete goHomePage={HomePageReturn} finalOrder={finalOrderData}/> : null }
      </div>
      <div className="bottom h-1/8 top-0">
        <Bottom />
      </div>
    </div>
  );
}

export default App;
