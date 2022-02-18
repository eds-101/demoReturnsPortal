function ReturnsComplete(props){  
    function goHome(){props.goHomePage()}
    console.log(props.finalOrder)

    return(
        <div>
            <div class="bg-[url('https://i.imgur.com/jAXaawT.jpg')] h-screen bg-cover bg-center flex justify-items-center items-center">
                <div class="px-10 lg:px-32 xl:px-40">
                <h1 class="text-6xl font-semibold mb-6">
                    <span>Return Complete</span>
                </h1>
                <ul>
                    {props.finalOrder.map((product) => {
                       return <li class="text-lg max-w-md">
                       {` ${product['Quantity'] > 1 ? product['Quantity'] + 'x' : ""}`} 
                       {product['Name'].slice(0,1) + product['Name'].slice(1).toLowerCase()}</li>
                    })}
                </ul>
                <button onClick={goHome} class="inline-block mt-10 px-10 py-3 bg-yellow-300 text-lg text-black font-semibold"
                >Back to Returns Page</button>
                </div>
            </div>
        </div>
    )
} 

export default ReturnsComplete