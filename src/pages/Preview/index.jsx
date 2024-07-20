import { Header } from "../../components/Header";
import prato from '../../assets/image.png';
import { PiPlusBold, PiMinusBold, PiReceiptBold } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { api } from '../../service/api';



export function Preview() {
  const { user } = useAuth();
  const { id } = useParams();
  const isAdmin = user.role === "admin";//Lógica para verificar se é admin

  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState(localStorage.getItem('@FoodExplorer:cart') ? JSON.parse(localStorage.getItem('@FoodExplorer:cart')) : []);

  const [dish, setDish] = useState();
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();

  const handleAddToCart = (dish) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(item => item.id === dish.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + (quantities[dish.id] || 1)
      };
    } else {
      updatedCart.push({ ...dish, quantity: quantities[dish.id] || 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('@FoodExplorer:cart', JSON.stringify(updatedCart));
    setQuantities({});
   
    
  };

  const increaseQuantity = (dishId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [dishId]: (prevQuantities[dishId] || 1) + 1
    }));
  };

  const decreaseQuantity = (dishId) => {
    if (quantities[dishId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [dishId]: prevQuantities[dishId] - 1
      }));
    }
  };


  function handleClick (dish){
    if(isAdmin){
      handleNavegateToEdit()
    }else{
      handleAddToCart(dish)
    }

  }

  function handleNavegateToEdit (){
    navigate(`/edit-dish/${id}`);
  }


  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await api.get(`/dish/${id}`);
        setDish(response.data?.dish);
        setIngredients(response.data?.ingredients);
      } catch (error) {
        console.error("Failed to fetch the dish:", error);
        // Exibir uma mensagem de erro para o usuário
        alert("Erro ao carregar o prato. Por favor, tente novamente mais tarde.");
        // Você pode definir um estado de erro se quiser exibir uma mensagem condicionalmente no componente
        setError("Erro ao carregar o prato.");
      }
    }

    fetchDishes();
  }, [id]);


  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="flex flex-col w-full min-h-screen p-5 lg:px-32 lg:py-16">
        <Link className="text-xl" to="/">&lt; Voltar </Link>
        <main className="flex flex-grow justify-center">
          <figure className="flex flex-col justify-center items-center w-full gap-5  lg:flex-row lg:gap-10 ">

            <img className="w-48 sm:w-72 lg:w-1/3" src={prato} alt="" />

            <div className="flex flex-col items-center w-2/3  gap-5 lg:w-1/2 lg:gap-9 lg:items-start">
              <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl lg:text-start font-semibold">{dish?.name}</h1>
              <p className="text-justify text-xs xs:text-sm lg:text-xl lg:text-justify">{dish?.description}</p>
              <section className="flex flex-wrap">
                {
                  ingredients.length ?
                    ingredients?.map((ingredient, index) => (
                      <div key={index} className="flex flex-row items-center justify-center gap-2 bg-Dark1000 rounded-lg p-2 m-1">
                        <p className="text-xs">{ingredient.name}</p>
                      </div>
                    ))
                    : (
                      <div  className="flex flex-row items-center justify-center gap-2 bg-Dark1000 rounded-lg p-2 m-1">
                        <p className="text-xs">Sem ingredientes</p>
                      </div>
                    )
                }
              </section>
              <section className="flex flex-row items-center justify-between gap-3 lg:gap-8">
                <div className={`flex flex-row items-center justify-center gap-2 lg:gap-3 ${isAdmin ? "hidden" : ""} `} >
                  <PiMinusBold className="w-3 h-3  lg:w-5 lg:h-5" onClick={() => decreaseQuantity(dish?.id)} />
                  <p className="text-sm font-roboto fot-bold lg:text-lg">{quantities[dish?.id] || 1}</p>
                  <PiPlusBold className="w-3 h-3 lg:w-5 lg:h-5" onClick={() => increaseQuantity(dish?.id)} />
                </div>

                
                <CustomButton className="flex text-xs lg:text-lg" title={`${isAdmin ? "Editar prato" : `incluir · R$ ${dish?.price*quantities[dish?.id]||dish?.price}`}`}  onClick={() => handleClick(dish)} />


              </section>
            </div>
          </figure>
        </main>
      </div>
      <Footer />
    </div>
  )
}