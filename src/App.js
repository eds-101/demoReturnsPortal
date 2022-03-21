import { useState} from 'react'
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
    window.scrollTo(0,0)
  }  
  
  function verifiedItemReturns(valid, finishedOrder){  
    if(valid){setShowScreen('ReturnsComplete')}   
    window.scrollTo(0,0)
    setFinalOrderData(finishedOrder)
  } 

  function HomePageReturn() { 
    setShowScreen('Home') 
    window.scrollTo(0,0)
  }

  return (
    <div>
      {showScreen === "Home" ? <Home getFinalisedOrder={populateOrder}/> : null}
      {showScreen === "ReturnSelector" ? <ReturnSelector loadOrder={orderData} goHomePage={HomePageReturn} finalReturns={verifiedItemReturns}/> : null}
      {showScreen === 'ReturnsComplete' ?  <ReturnsComplete goHomePage={HomePageReturn} finalOrder={finalOrderData}/> : null }
    </div>
  );
}

export default App;
