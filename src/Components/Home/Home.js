import { useState } from 'react'
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';

function Home(props){ 
    const [emailInstead, setEmailInstead] = useState(false)
    function switchUserInput() {emailInstead ? setEmailInstead(false) : setEmailInstead(true)}

    const API_KEY = process.env.REACT_APP_API_KEY || process.env.REACT_APP_WEATHER_API_KEY 

    async function handleSubmit(e) {
        e.preventDefault()  
        const submittedOrderNumber = e.target[0].value.trim()
        const submittedUserValue = e.target[1].value.trim() 
        try { 
            // GET /api/Order/Search
            const getOrderDetails = await fetch(`https://api.mintsoft.co.uk/api/Order/Search?APIKey=${API_KEY}&OrderNumber=${submittedOrderNumber}`)
            const orderDetails = await getOrderDetails.json() 
            console.log(orderDetails)
            const orderEmail = orderDetails[0].Email
            const orderPostCode = orderDetails[0].PostCode  
            const firstOrderID = orderDetails[0].OrderNameValues[0].OrderId
            console.log(orderEmail, " ", firstOrderID)
            const auth = submittedUserValue.includes('@') ? authenticateUser("email", submittedUserValue, orderEmail) : authenticateUser("postcode", submittedUserValue, orderPostCode) 
            if(auth) {
                const products = await getProducts(firstOrderID)
                const fullOrder = await getProductData(products)
                console.log(fullOrder)
                // add order date to order here?
                setTimeout(() => props.getFinalisedOrder(fullOrder), 1000)
            }  
        } catch(error) {
            // alert("Something went wrong, please try again")
            console.log(error)  
        }
    }
    // async function handleSubmit(e) {
    //     e.preventDefault()  
    //     const submittedOrderNumber = e.target[0].value.trim()
    //     const submittedUserValue = e.target[1].value.trim() 
    //     try { 
    //         // GET /api/Order/Search
    //         const getOrderDetails = await fetch(`https://api.mintsoft.co.uk/api/Order/Search?APIKey=${API_KEY}&OrderNumber=${submittedOrderNumber}`)
    //         const orderDetails = await getOrderDetails.json() 
    //         const orderDateparsed = new Date(orderDetails[0].OrderDate.slice(0,10)) // Date obj from 2021-06-16T10:25:36.7951757 
    //         const orderEmail = orderDetails[0].Email
    //         // const orderID = orderDetails[0].
    //         const orderPostCode = orderDetails[0].PostCode  
    //         console.log(orderDetails)
    //         console.log(orderEmail, orderPostCode)
    //         const auth = submittedUserValue.includes('@') ? authenticateUser("email", submittedUserValue, orderEmail) : authenticateUser("postcode", submittedUserValue, orderPostCode) 
    //         if(auth) {
    //             const startOrder = await fetchOrder(submittedOrderNumber, orderDateparsed)
    //             console.log(startOrder)
    //             const updatedOrder = await completeOrderDetails(startOrder)
    //             setTimeout(() => props.getFinalisedOrder(updatedOrder), 1000)
    //         }  
    //     } catch(error) {
    //         // alert("Something went wrong, please try again")
    //         console.log(error)  
    //     }
    // }


    // function parseOrderNumber(rawOrder) {
    //     return rawOrder.replace(/\D/g, "")
    // }

    function authenticateUser(method, customerEntry, systemEntry){
        if(customerEntry === systemEntry) {return true}
        else {
            alert(`Please check the ${method ==="postcode" ? "postcode" : "email address"} you entered and try again.`)
            return false
            }
    }

    async function getProducts(orderID){
        try { 
            // GET /api/Order/{id}/Items
            const getProducts = await fetch(`https://api.mintsoft.co.uk/api/Order/${orderID}/Items?APIKey=${API_KEY}`) 
            const productsArray = await getProducts.json() 
            console.log(productsArray)
            let productsInOrder = []
            let product = {}
            for(let i = 0; i < productsArray.length; i++) {
                product['ID'] = productsArray[i].ProductId 
                product['Quantity'] = productsArray[i].Quantity
                product['OrderDate'] = null
                product['Returnable'] = true
                productsInOrder.push(product) 
                product = {}
            }
            console.log(productsInOrder)
            return productsInOrder
        } catch(error) {
            console.log(error)
        }
    }  
    // async function fetchOrder(orderNumber, orderDate){
    //     try { 
            
    //         const getProductsFromOrder = await fetch(`https://api.mintsoft.co.uk/api/Order/${orderNumber}/Items?APIKey=${API_KEY}`) 
    //         const productsRaw = await getProductsFromOrder.json() 
    //         console.log(productsRaw)
    //         let productsInOrder = [], product = {}
    //         for(let i = 0; i < productsRaw.length; i++) {
    //                 let id = productsRaw[i].ProductId, quantity = productsRaw[i].Quantity 
    //                 product['ID'] = id 
    //                 product['Quantity'] = quantity
    //                 product['Returnable'] = 3516 !== id
    //                 product['OrderDate'] = orderDate
    //                 productsInOrder.push(product) 
    //                 console.log(product)
    //                 product = {}
    //             }
    //         return productsInOrder

    //         } catch(error) {
    //             console.log(error)
    //         }
    // }  

    // function validateOrderDate(orderDate, daysToAllowReturns) {
    //     const daysSinceOrderRaw = new Date - orderDate
    //     const daysSinceOrder = daysSinceOrderRaw/(1000 * 3600 * 24)
    //     return daysSinceOrder < daysToAllowReturns ? true : false
    // }

    async function getProductData(productsArray){ 
        let productList = []
        let product = {} 
        try{
            productsArray.map(async productdata => {
                // GET /api/Product/{id}
                const productApiCall = await fetch(`https://api.mintsoft.co.uk/api/Product/${productdata['ID']}?APIKey=${API_KEY}`) 
                const rawProductData = await productApiCall.json()  
                console.log(rawProductData)
                product['Name'] = rawProductData.Name  
                product['Price'] = rawProductData.Price 
                product['ImageURL'] = rawProductData.ImageURL  
                product['ID'] = productdata['ID']  
                product['Returnable'] = productdata['Returnable']
                product['Quantity'] = productdata['Quantity'] 
                product['OrderDate'] = productdata['OrderDate'] 
                productList.push(product) 
                product = {}
            }) 
        } 
        catch(error){
            console.log(`Error: ${error}`)
        }  
        console.log(productList)
        return productList
    }  
    // async function completeOrderDetails(initialOrderDetails){ 
    //     console.log(initialOrderDetails)
    //     let listOfProducts = [], product = {} 
    //     try{
    //         initialOrderDetails.map(async (initialProductData) => {
    //             product['ID'] = initialProductData['ID']  
    //             product['Returnable'] = initialProductData['Returnable']
    //             product['Quantity'] = initialProductData['Quantity'] 
    //             product['OrderDate'] = initialProductData['OrderDate'] 
    //             const productApiCall = await fetch(`https://api.mintsoft.co.uk/api/Product/${initialProductData['ID']}?APIKey=${API_KEY}`) 
    //             const rawProductData = await productApiCall.json()  
    //             product['Name'] = rawProductData.Name  
    //             product['Price'] = rawProductData.Price 
    //             product['ImageURL'] = rawProductData.ImageURL  
    //             listOfProducts.push(product) 
    //             product = {}
    //         }) 
    //     } 
    //     catch(error){
    //         console.log(`Error: ${error}`)
    //     }  
    //     return listOfProducts
    // }  

    return(
        <div className="app h-screen w-screen flex flex-col relative">
            <Top />
        <div className="app h-full flex justify-center bg-gradient-to-tl from-gray-100 to-white w-full py-6 px-4 overscroll-auto">
                <div class="shadow rounded lg:w-1/3  md:w-1/2 w-full p-5">
                    <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-5"
                    >Start your returns here
                    </p>
                    <form className="orderAuth" onSubmit={handleSubmit}>  
                        <div>
                            <label id="orderNumber" class="text-base font-medium leading-none text-gray-800">
                                Order Number <em>Test: Use 123456789</em>
                            </label>
                            <input required aria-labelledby="orderNumber" type="text" class="bg-yellow-100 border rounded  text-base font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                        </div>
                        
                        {emailInstead ? 
                        <div class="mt-6  w-full">
                            <label for="email" class="text-base font-medium leading-none text-gray-800">
                                Email Address <em>Test: Use michelle.billings@tupack.co.uk</em>
                            </label>
                            <div class="relative flex items-center justify-center">
                            <input required id="email" type="email" class="bg-yellow-100 border rounded  text-base font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                            </div>
                            </div>
                        </div>
                        : 
                        <div class="mt-6  w-2/5">
                            <label for="postcode" class="text-base font-medium leading-none text-gray-800">
                                Postcode <em>Test: Use CV6 6AT</em>
                            </label>
                            <div class="relative flex items-center justify-center">
                            <input required id="postcode" type="text" class="bg-yellow-100 border rounded  text-base font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                            </div>
                            </div>
                        </div>
                        }
                        <div class="w-full flex items-center justify-between py-5">
                            <hr class="w-full bg-gray-400" />
                            <p class="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                            <hr class="w-full bg-gray-400  " />
                        </div>
                        <p tabindex="0" class="focus:outline-none text-base mt-2 font-medium leading-none text-gray-500"
                        >Having issues? 
                        {emailInstead ? 
                        <a onClick={switchUserInput} class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-base font-medium leading-none  text-gray-800 cursor-pointer"
                        > Enter your postcode</a>
                        :
                        <a onClick={switchUserInput} class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-base font-medium leading-none  text-gray-800 cursor-pointer"
                        > Enter your email instead</a>
                        }
                        </p>
                        <div class="mt-8">
                            <button class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-base font-semibold leading-none text-black focus:outline-none bg-yellow-300 border rounded hover:bg-yellow-600 py-4 w-full"
                            >Find your order</button>
                        </div>
                    </form>
            </div>   
        </div>
        <div className="bottom h-1/8 w-full absolute bottom-0">
            <Bottom />
        </div>
        </div>
    )

}

export default Home
