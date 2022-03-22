import { useState } from 'react'
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';
import logo from './logoOrange.png'

function Home(props){ 
    const [emailInstead, setEmailInstead] = useState(false)
    function switchUserInput() {emailInstead ? setEmailInstead(false) : setEmailInstead(true)}

    const API_KEY = process.env.REACT_APP_API_KEY || process.env.REACT_APP_WEATHER_API_KEY 

    async function handleSubmit(e) {
        e.preventDefault()  
        const submittedOrderNumber = e.target[0].value.trim()
        const submittedUserValue = e.target[1].value.trim() 
        props.getFinalisedOrder("fullOrder")
        return
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

    return(
        <body class="bg-amber-500 ">
            <div class="flex min-h-screen items-center justify-center">

                <div class=" bg-white border border-none p-3 rounded-2xl">

                    <div class="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
                            <div class="w-2/5 h-1/5">
                                <img src={logo} alt='logo'/>
                                <h1 class="text-black text-center text-4xl">Returns Portal</h1>
                            </div>

                        <form className="orderAuth flex flex-col  space-y-5 py-10" onSubmit={handleSubmit}>  
                            <h1 class="text-black text-2xl">Start Your Returns Here</h1>

                            <input required class="w-full p-2 bg-black rounded-md  border border-gray-700 focus:border-blue-700"
                                placeholder="Order Number" type="text" />

                            {emailInstead ?
                            <input required class="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700"
                                placeholder="Email Address" type="email" />
                            :
                            <input required class="w-1/8 p-2 bg-black rounded-md border border-gray-700 " placeholder="Postcode"
                                type="text" />
                            }
                            <p>Having issues? 
                            {emailInstead ?
                            <a class="font-semibold text-amber-500 cursor-pointer" onClick={switchUserInput}> Enter your postcode</a> 
                            :
                            <a class="font-semibold text-amber-500 cursor-pointer"  onClick={switchUserInput}> Enter your email</a> 
                            }
                            </p>
                            <input class="w-full p-2 bg-black hover:bg-amber-500 rounded-full font-bold text-white hover:text-black border border-gray-700 cursor-pointer"
                                type="submit" />

                        </form>
                    </div>


                </div>

            </div>
    </body>
    )

}

export default Home
