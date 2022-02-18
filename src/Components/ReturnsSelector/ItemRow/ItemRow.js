const returnsReasons = [
    "Does not fit", "I changed my mind", "It's too expensive"
]  

function ItemRow(props) { 

    function populateReturnQuantityOptions(quantity) {
        const quantList = []
        for(let i=0; i <= quantity; i++) {
            quantList.push(i)
        }
        return quantList
    } 

    const quantity = populateReturnQuantityOptions(props.quantity)

    function returnReason(reason, id, name, imageURL){
        let StoringReasonAndItemID = {'ItemId': id, 'Reason': reason.target.value, 'Name': name, 'ImageURL': imageURL, 'Quantity': 0}  
        props.returnReasonHandler(StoringReasonAndItemID)
    }

    function returnQuantity(quantity, id, name, imageURL){
        const itemQuantityToReturn = {'ItemId': id, 'Quantity': Number(quantity.target.value), 'Name': name, 'ImageURL': imageURL}
        props.returnQuantityHandler(itemQuantityToReturn)  
    }

    //sort out capitalisation of the product names
    //update for mobile view
    return(
            <div class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/2">
                <div class="w-full bg-white rounded shadow-2xl">
                    <div class="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <div class="mr-4 w-24 h-24 rounded shadow">
                                    <img class="w-full h-full overflow-hidden object-cover object-center rounded" src={props.imgURL} alt="" />
                                </div>
                                <div>
                                    <div class="mb-2 text-gray-700">
                                        <p class="font-semibold text-xl">{props.name}</p>
                                    </div>
                                    <div class="mb-2 relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                                            { props.returnable ? <select required onChange={(e) => returnQuantity(e, props.itemID, props.name, props.ImageURL)} 
                                            aria-label="select access" class="cursor-pointer focus:font-bold hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-yellow-300 w-full appearance-none pr-8 py-1 mb-2">
                                            <option>Qty to return</option>
                                            {quantity.map(i => <option value={i}>{Number(i)}</option>)}
                                            </select> 
                                            : null}
                                        {props.returnable ? <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 mr-2 icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                        : null}
                                    </div>
                                    <div class="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                                        { props.returnable ? 
                                        <select required onChange={(e) => returnReason(e, props.itemID, props.name, props.ImageURL)} 
                                        aria-label="select access" class="cursor-pointer focus:font-bold hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-yellow-300 w-full appearance-none pr-8 py-1">
                                        <option>Why?</option>
                                        {returnsReasons.map((r) => <option value={r}>{r}</option>)}
                                        </select> 
                                        : null}
                                        {props.returnable ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 mr-2 icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                        : null}
                                    </div>
                                    <div class="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                                        { props.returnable ? null : <p>This is outside the return period</p>}
                                    </div>
                                </div>
                            </div>
                            <div>


                            </div>
                        </div>
                        <hr class="my-3 border-t border-gray-200" />
                    </div>
                </div>
            </div> 
    )
}

export default ItemRow