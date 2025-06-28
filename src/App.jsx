import { useState,useEffect } from "react"
import Guitar from "./Components/Guitar"
import Header from "./Components/Header"
import { db } from './data/db'


function App() {
  
    const initialCart=() => {
        const localStorageCart=localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }


  //state
  const [data]=useState(db)
  
  // esto iba antes de crear el initialCart const [cart, setCart]=useState([])
  const [cart, setCart]=useState(initialCart)
  //console.log(data)

  useEffect(() =>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])
  
function addToCart(item){
    //validamos el ingresos
    const itemExist=cart.findIndex((guitar) => guitar.id === item.id)
    //revisamos en la consola
    //console.log(itemExist)
    if (itemExist>=0){
        if (cart[itemExist].quantity >= 5) return
        //haremos una copia del carrito
        //console.log("Ya existe")
        const updateCart=[...cart]
        updateCart[itemExist].quantity++
        setCart(updateCart)
    }else{
        //console.log("No existe")
        item.quantity=1
        setCart(prevCart => [...prevCart, item])
    }

    // borramos el console despues de agregar
    //console.log('agregando')
    saveLocalStorage()
}

function removeFrontCart(id){
    //despues de analizar todo console.log("Eliminando...",id)
    setCart(prevCart => prevCart.filter( guitar => guitar.id != id))
}

function increaseQuantity(id){
    // despues de ver que funciona lo comento console.log("Incrementando", id)
    //.map crea un nuevo array
    const updatedCart = cart.map(item=>{
        if( item.id === id && item.quantity < 5 ){
            return{
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    setCart(updatedCart)
}

function decreaseQuantity(id){
    const updatedCart = cart.map(item=>{
        if( item.id === id && item.quantity > 1 ){
            return{
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updatedCart)
}

function clearCart(){
    setCart([])
}

/*
function saveLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
*/
    return (
   <>

    <Header 
        cart={cart}
        removeFrontCart={removeFrontCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
    />

    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuesltra Colección</h2>

        <div className="row mt-5">
           {data.map( (guitar) => {

            return(
                <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            )
           })}
           
        

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>

  )
}

export default App
