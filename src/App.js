import { useState, useEffect } from 'react'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import ReturnSelector from './Components/ReturnsSelector/ReturnSelector'
import dummyData from './dummyData';


function App() {
  const [showScreen, setShowScreen] = useState('Home') 
  const [orderData, setOrderData] = useState([]) 


  function populateOrder(order){      
    console.log(order)  
    setOrderData(order)     
      setShowScreen('ReturnSelector')
  }  

  return (
    <div id="app">
      <div id="header">
      <Header />
      </div>
      <div id="app">
        {showScreen === "Home" ? <Home getFinalisedOrder={populateOrder}/>
         : null}
        {showScreen === "ReturnSelector" ? <ReturnSelector loadOrder={dummyData}/>
         : null}
      </div>
      <div id="footer">
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
