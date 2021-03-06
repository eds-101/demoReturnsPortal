import { useState, useEffect } from 'react'
import ItemRow from './ItemRow/ItemRow'
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';
import logo from '../Home/logoOrange.png'

function ReturnSelector(props) {     
    const [allProductsInOrder, setAllProductsInOrder] = useState([])    
    const [customerChosenReturns, setCustomerChosenReturns] = useState([])
    
    function goHome(){props.goHomePage()}


    useEffect(() => {
        setAllProductsInOrder(props.loadOrder) 
    }, [props.loadOrder])   

    useEffect(() => {
        setCustomerChosenReturns(customerChosenReturns)    
        // console.log(customerChosenReturns)
    }, [customerChosenReturns])

    function addItemAndReturnReason(itemAndReturnObject){   
        let flag = true
        for(let i=0; i<customerChosenReturns.length; i++) {
            if(customerChosenReturns[i]['id'] === itemAndReturnObject['id']) {
                customerChosenReturns[i]["Reason"] = itemAndReturnObject["Reason"]
                flag = false
            }
        }
        if(flag) {setCustomerChosenReturns(currentReturns => [...currentReturns, itemAndReturnObject])}
    }

    function addItemQuantityToReturn(itemAndQuantObject){   
        let flag = true
        for(let i=0; i<customerChosenReturns.length; i++) {
            if(customerChosenReturns[i]['id'] === itemAndQuantObject['id']) {
                customerChosenReturns[i]["Quantity"] = itemAndQuantObject["Quantity"]
                flag = false
            }
        }
        if(flag) {setCustomerChosenReturns(currentReturns => [...currentReturns, itemAndQuantObject])}
    }  
    
    function submitCustomerReturn(){ 
        // console.log(customerChosenReturns)
        const filteredReturns = customerChosenReturns.filter((item) => item['Quantity'] >= 1)   
        if(filteredReturns.length === 0){ 
            alert("Please choose one or more items to return")    
            return 
        }
        props.finalReturns(true, filteredReturns)
    } 

    function uncapitalise(phrase) {
        return phrase.slice(0,1) + phrase.slice(1).toLowerCase()
    }



    return(
        <body class="bg-amber-500">
            <div class="flex min-h-screen items-center justify-center">
                <div class=" bg-white border border-none p-4 rounded-2xl">

                <div class="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-4 font-semibold text-gray-500 flex-col">

                <div class="w-3/5 h-1/5">
                                <img onClick={goHome} src={logo} alt='logo' class="cursor-pointer"/>
                                <h1 onClick={goHome} class="text-black text-center text-4xl cursor-pointer">Returns Portal</h1>
                            </div> 
                        <div className='products py-6 space-y-4 overscroll-auto flex flex-col items-center justify-center'>
                            {allProductsInOrder.map((p) => {  
                                console.log(p)
                                return <ItemRow key={p['id']} id={p['id']} name={uncapitalise(p['Name'])} 
                                returnable={p['Returnable']}
                                imgURL={p['ImageURL']} quantity={Number(p['Quantity'])} 
                                price={p['Price']} returnReasonHandler={addItemAndReturnReason}
                                returnQuantityHandler={addItemQuantityToReturn} /> 
                            })}  
                            <div class="flex flex-col items-center justify-center my-5">
                                <button onClick={submitCustomerReturn} class="w-full p-5 bg-black hover:bg-amber-500 rounded-full font-bold text-white hover:text-black border border-gray-700 cursor-pointer "
                                type="submit">Confirm Return</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default ReturnSelector