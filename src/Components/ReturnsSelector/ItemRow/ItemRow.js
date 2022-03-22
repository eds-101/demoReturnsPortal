const returnsReasons = [
    "Does not fit", "I changed my mind", "It's too expensive"
]  

function ItemRow(props) { 
    const quantity = populateReturnQuantityOptions(props.quantity)

    function populateReturnQuantityOptions(quantity) {
        const quantList = []
        for(let i=0; i <= quantity; i++) {
            quantList.push(i)
        }
        return quantList
    } 

    function returnReason(reason, id, name, imageURL){
        let StoringReasonAndItemID = {'id': id, 'Reason': reason.target.value, 'Name': name, 'ImageURL': imageURL, 'Quantity': 0}  
        props.returnReasonHandler(StoringReasonAndItemID)
    }

    function returnQuantity(quantity, id, name, imageURL){
        const itemQuantityToReturn = {'id': id, 'Quantity': Number(quantity.target.value), 'Name': name, 'ImageURL': imageURL}
        props.returnQuantityHandler(itemQuantityToReturn)  
    }

    return(
        <div class="w-full h-full p-8 xl:px-8  rounded-md border border-black">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-10 ">
                    <div class=" mr-4 w-24 h-24 rounded ">
                        <img class="w-full h-full  overflow-hidden object-cover object-center rounded" src={props.imgURL} alt="" />
                    </div>
                    <div>
                        <div class="mb-2 text-black text-2xl">
                            <p class="font-semibold text-l">{props.name}</p>
                        </div>
                        <div class="mb-2 relative font-normal text-base sm:text-base flex items-center text-gray-600">
                            { props.returnable ? 
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                                <select required onChange={(e) => returnQuantity(e, props.id, props.name, props.ImageURL)} 
                                class="border border-gray-300 rounded-md cursor-pointer font-semibold text-gray-500 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                    <option hidden disabled selected>Quantity to Return</option>
                                    {quantity.map(i => <option value={i}>{Number(i)}</option>)}
                                </select>
                            </div>
                            : null}
                        </div>
                        <div class="relative font-normal text-base sm:text-base flex items-center text-gray-600">
                            { props.returnable ? 
                            <div class="relative inline-flex">
                                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                                <select required onChange={(e) => returnReason(e, props.id, props.name, props.ImageURL)} 
                                class="border border-gray-300 rounded-md cursor-pointer font-semibold text-gray-500 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                    <option hidden disabled selected>Reason for Return</option>
                                    {returnsReasons.map((r) => <option value={r}>{r}</option>)}
                                </select>
                            </div>
                            : null}
                        </div>
                        <div class="relative font-semibold text-base sm:text-base flex items-center text-gray-600">
                            {props.returnable ? null : <p>This product is not eligible for return</p>}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default ItemRow