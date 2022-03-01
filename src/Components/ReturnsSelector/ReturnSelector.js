import ItemRow from './ItemRow/ItemRow'
import { useState, useEffect } from 'react'

function ReturnSelector(props) {     
    const [allProductsInOrder, setAllProductsInOrder] = useState([])    
    const [customerChosenReturns, setCustomerChosenReturns] = useState([])

    useEffect(() => {
        setAllProductsInOrder(props.loadOrder) 
    }, [props.loadOrder])   

    useEffect(() => {
        setCustomerChosenReturns(customerChosenReturns)    
        console.log(customerChosenReturns)
    }, [customerChosenReturns])

    function addItemAndReturnReason(itemAndReturnObject){   
        let itemReturnIsFound = false
        customerChosenReturns.map((customerReturnItem) => { 
            if(customerReturnItem['ItemId'] === itemAndReturnObject['ItemId']){   
                customerReturnItem['Reason'] = itemAndReturnObject['Reason']    
                customerReturnItem['Name'] = itemAndReturnObject['Name']    
                customerReturnItem['ImageURL'] = itemAndReturnObject['ImageURL']    
                itemReturnIsFound = true 
            }  
        }) 
        if(!itemReturnIsFound){ setCustomerChosenReturns(currentReturns => [...currentReturns, itemAndReturnObject])}  
    }

    function addItemQuantityToReturn(itemAndQuantObject){   
        let itemReturnIsFound = false
        customerChosenReturns.map((customerReturnItem) => { 
            if(customerReturnItem['ItemId'] === itemAndQuantObject['ItemId']){  
                customerReturnItem['Quantity'] = itemAndQuantObject['Quantity']     
                customerReturnItem['Name'] = itemAndQuantObject['Name']    
                customerReturnItem['ImageURL'] = itemAndQuantObject['ImageURL']    
                itemReturnIsFound = true
            }  
        }) 
        if(!itemReturnIsFound){ setCustomerChosenReturns(currentReturns => [...currentReturns, itemAndQuantObject]) }  
    }  
    
    function submitCustomerReturn(){ 
        console.log(customerChosenReturns)
        const filteredReturns = customerChosenReturns.filter((item) => item['Quantity'] >= 1)   
        if(filteredReturns.length === 0){ 
            alert("Please choose one or more items to return")    
            return 
        }
        console.log(filteredReturns)  
        props.finalReturns(true, filteredReturns)
    } 

    function uncapitalise(phrase) {
        return phrase.slice(0,1) + phrase.slice(1).toLowerCase()
    }

    // add existing back button
    return( 
        <div>  
            <div className='flex flex-col items-center justify-center'>
                {allProductsInOrder.map((p) => {  
                    return <ItemRow key={p['id']} id={p['id']} name={uncapitalise(p['Name'])} 
                    returnable={p['Returnable']}
                    imgURL={p['ImageURL']} quantity={Number(p['Quantity'])} 
                    price={p['Price']} returnReasonHandler={addItemAndReturnReason}
                    returnQuantityHandler={addItemQuantityToReturn} /> 
                })}  
            </div>
            <div class="flex flex-col items-center justify-center my-5">
                <button onClick={submitCustomerReturn} role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-m font-semibold leading-none text-black focus:outline-none bg-yellow-300 border rounded hover:bg-yellow-600 py-4 w-1/3">Submit your return</button>
            </div>
        </div>
    )
}

export default ReturnSelector