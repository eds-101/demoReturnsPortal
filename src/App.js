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
    // window.scrollTo(0,0)
  }  
  
  function verifiedItemReturns(valid, finishedOrder){  
    if(valid){setShowScreen('ReturnsComplete')}   
    // window.scrollTo(0,0)
    setFinalOrderData(finishedOrder)
  } 

  function HomePageReturn() { 
    setShowScreen('Home') 
    // window.scrollTo(0,0)
  }

  return (
    <div className="app h-screen w-screen">
      <div className='top h-1/8'>
        <Top />
        {showScreen === "ReturnSelector" ?
        <div class="flex flex-col items-center justify-center my-5">
        <button onClick={HomePageReturn} class="focus:ring-1 focus:ring-offset-1 focus:ring-indigo-300 text-m font-semibold leading-none text-black focus:outline-none bg-yellow-300 border rounded hover:bg-yellow-600 py-2 w-1/6"
        >Go back</button>  </div> 
        : null}
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
