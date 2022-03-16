import { useState, useEffect } from 'react'
import ItemRow from './ItemRow/ItemRow'
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';

function ReturnSelector(props) {     
    const [allProductsInOrder, setAllProductsInOrder] = useState([])    
    const [customerChosenReturns, setCustomerChosenReturns] = useState([])

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

    // {showScreen === "ReturnSelector" ?
    // <div class="flex flex-col items-center justify-center my-5">
    // <button onClick={HomePageReturn} class="focus:ring-1 focus:ring-offset-1 focus:ring-indigo-300 text-m font-semibold leading-none text-black focus:outline-none bg-yellow-300 border rounded hover:bg-yellow-600 py-2 w-1/6"
    // >Go back</button>  </div> 
    // : null}

    return( 
        <div className="app h-full w-full flex flex-col relative">
            <Top />
            <div className='products h-5/6 pt-3 pb-7 overscroll-auto flex flex-col items-center justify-center'>
                {allProductsInOrder.map((p) => {  
                    return <ItemRow key={p['id']} id={p['id']} name={uncapitalise(p['Name'])} 
                    returnable={p['Returnable']}
                    imgURL={p['ImageURL']} quantity={Number(p['Quantity'])} 
                    price={p['Price']} returnReasonHandler={addItemAndReturnReason}
                    returnQuantityHandler={addItemQuantityToReturn} /> 
                })}  
                <div class="flex flex-col items-center justify-center my-5">
                    <button onClick={submitCustomerReturn} class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-m font-semibold leading-none text-black focus:outline-none bg-yellow-300 border rounded hover:bg-yellow-600 p-5 mb-10"
                    >Confirm Return</button>
                </div>
            </div>
            <div className="bottom w-full absolute bottom-0">
                <Bottom />
            </div>
        </div>
    )
}

export default ReturnSelector