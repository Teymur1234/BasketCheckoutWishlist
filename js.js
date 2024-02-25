document.addEventListener("DOMContentLoaded",function(params) {
    document.getElementById("go-to-checkout").addEventListener("click",()=>{
        window.location.href="./checout.html"
    })
    const addBasket=document.querySelectorAll(".add")
    const deleteAll=document.getElementById("deleting")
    deleteAll.addEventListener("click",()=>{
        localStorage.removeItem("basket")
        const elements=document.querySelector(".elements")
        elements.innerText="Empty"
        updateCount()
        basketadding()
    })
    addBasket.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=button.parentElement
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                name:card.querySelector("p").innerText,
                price:card.querySelector("h1").innerText.replace("$",""),
                quantity:1
            }
            addToBasket(product)
        })
    })
    function  addToBasket(addproduct){
        let cart=JSON.parse(localStorage.getItem("basket")) || []
        const existingProduct=cart.findIndex((product)=>product.id===addproduct.id)
        if (existingProduct>-1) {
            cart[existingProduct].quantity+=1
        }
        else{
            cart.push(addproduct)
        }
        localStorage.setItem("basket",JSON.stringify(cart))
        basketadding()
        updateCount()
    }
    function basketadding() {
        const cart=JSON.parse(localStorage.getItem("basket")) || []
        const elements=document.querySelector(".elements")
        elements.innerHTML=``
        cart.forEach((product)=>{
            elements.innerHTML=`<div class="cartProduct"  data-id=${product.id}><img class="cartImage" src=${product.image} alt="">${product.name}-1 eded ${product.price}-${product.quantity} eded -qiymet:${(product.quantity*product.price).toFixed(2)} <i class="fa-solid fa-trash delete-product"></i></div>`
        })
        const totalPrice=cart.reduce((toplam,item)=>toplam+item.price*item.quantity,0)
        document.getElementById("total1").textContent=totalPrice.toFixed(2)
        document.getElementById("total").textContent=totalPrice.toFixed(2)
        const deleteProduct=document.querySelectorAll(".delete-product")
        deleteProduct.forEach(delPro=>{
            delPro.addEventListener("click",(e)=>{
                const card=e.target.closest(".cartProduct")
                const productId=card.dataset.id
                console.log(productId);
            })
        })
    }
    function updateCount() {
        const cart=JSON.parse(localStorage.getItem("basket")) || []
        const say=cart.reduce((toplam,item)=>toplam+=item.quantity,0)
        document.getElementById("say").innerText=say
        const uniqueItems = new Set(cart.map(product => product.id));
        document.getElementById("different").innerText=uniqueItems.size
    }
    const addToWishlistButton= document.querySelectorAll(".add-to-wishlist")

   addToWishlistButton.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=e.target.closest(".card")
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                title:card.querySelector("h1").innerText,
                price:parseFloat(card.querySelector("p").innerText.replace("$",'')),
                quantity: 1
            }
            addToWishlist(product)
        })
   })

   function addToWishlist(data) {
        let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []

        let isHas=(product)=>product.id === data.id
        const existWishlist=wishlist.some(isHas)

        if(!existWishlist){
            wishlist.push(data)
            localStorage.setItem("wishlist",JSON.stringify(wishlist))
        }else{
            alert("Bu product wishlistde var!")
        }
        DisplayWishlist()
        
   }

   function DisplayWishlist() {

    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []

    const wishlistItems=document.getElementById("wishlist-items")
    

    wishlistItems.innerHTML=''

    wishlist.forEach((product)=>{
        const productElement=document.createElement("div")

        productElement.innerHTML=`<div class="card" >
        <img src=${product.image} alt="Mercedes">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="add-to-cart">Add to cart</button>
        <button class="remove-to-wishlist" data-id=${product.id}>Remove to wishlist</button>
    </div>`

    wishlistItems.appendChild(productElement)

   
        
        
})

wishlistItems.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = wishlist[index];
        addToCart({
            id: product.id,
            image: product.image,
            title: product.title,
            price: parseFloat(product.price), 
            quantity: 1
        });
        DisplayCart();
    });
});
    
    document.querySelectorAll(".remove-to-wishlist").forEach(button=>{
        button.addEventListener("click",(e)=>{
            const productId=e.target.dataset.id
            console.log(productId);
            removeFromWishlist(productId)
        })
    })
    
   }

   function removeFromWishlist(productID) {
    
        let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []

        const updatedWishlist=wishlist.filter((item)=> item.id!==productID)
        localStorage.setItem("wishlist",JSON.stringify(updatedWishlist))
        DisplayWishlist()

   }
   
   DisplayWishlist()
   basketadding()
   updateCount()
})