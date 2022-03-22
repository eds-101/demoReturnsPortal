import logo from '../Home/logoOrange.png'

function ReturnsComplete(props){  
    function goHome(){props.goHomePage()}
    // console.log(props.finalOrder)

    return(
        <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
            <img alt="..." class="max-w-full rounded-lg shadow-lg" src="https://images.pexels.com/photos/5119209/pexels-photo-5119209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        </div>
        <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div class="md:pr-12">
            <div class="text-center inline-flex items-center justify-center w-24 h-24 mb-1 mt-8">
                <img src={logo} alt='logo'/>
            </div>
            <h3 class="text-5xl font-semibold">Return Complete</h3>
            <p class="mt-4 leading-relaxed text-2xl font-semibold">
                Products To Send Back
            </p>
            <ul class="list-none mt-2">
                    {props.finalOrder.map((product) => {
                        return <li class="py-2">
                                    <div class="flex items-center">
                                    <div>
                                        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-amber-500 mr-3"><i class="fas fa-fingerprint"></i></span>
                                    </div>
                                    <div>
                                        <h4 class="text-blueGray-500 text-lg max-w-md">
                                        {` ${product['Quantity'] > 1 ? product['Quantity'] + 'x ' : ""}`} 
                                        {product['Name'].slice(0,1) + product['Name'].slice(1).toLowerCase()}
                                        </h4>
                                    </div>
                                    </div>
                                </li>
                    })}
            </ul>
            <div class="mt-5">
                <button onClick={goHome} class="w-3/5 p-5 bg-black hover:bg-amber-500 rounded-full font-bold text-white hover:text-black border border-gray-700 cursor-pointer "
                type="submit">Start New Return</button>
            </div>
            </div>
        </div>
</div>
    )
} 

export default ReturnsComplete