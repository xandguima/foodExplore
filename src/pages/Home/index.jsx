import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { api } from '../../service/api';
import explore from '../../assets/logoFooter.svg'
import pngHome from '../../assets/pngHome.svg';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PiCaretLeftBold, PiCaretRightBold, PiPencilSimple } from "react-icons/pi";
import { DishList} from '../../components/DishCard';

export function Home() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [dishs, setDishs] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState(localStorage.getItem('@FoodExplorer:cart') ? JSON.parse(localStorage.getItem('@FoodExplorer:cart')) : []);

  const { user } = useAuth();
  const isAdmin = user.rule === 'admin';
  const listRef = useRef(null);
  console.log("dishs", dishs)
  // Função para buscar pratos com base na pesquisa
  const handleSearch = async (lastSearch) => {
    setSearch(lastSearch);
  };

  // Efeito para buscar pratos ao carregar o componente ou ao alterar a pesquisa
  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dish?search=${search}`);
      setDishs(response.data);
    }
    fetchDishes();
  }, [search]);

  // Efeito para extrair categorias dos pratos
  useEffect(() => {
    const categoriasSet = new Set(dishs.map(dish => dish.category));
    setCategories([...categoriasSet]);
  }, [dishs]);

  // Função para adicionar pratos ao carrinho
  const handleAddToCart = (dish) => {
    const updatedCart = [...cart];
    console.log("updatedCart", updatedCart)
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

  // Funções para aumentar e diminuir a quantidade de pratos
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

  // Funções para scroll na lista de pratos
  const scrollLeft = () => {
    if (listRef.current && listRef.current.scrollLeft > 0) {
      listRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current && listRef.current.scrollLeft < listRef.current.scrollWidth - listRef.current.clientWidth) {
      listRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header isAdmin={isAdmin} onSearch={handleSearch} />
      <section className="w-5/6 mx-auto mt-8 sm:mt-8 lg:mt-36">
        <div className="relative flex flex-row rounded-sm items-center justify-end max-width: 7xl h-20 bg-gradient-to-b from-LightGradient to-DarkGradient sm:h-24 lg:h-60 lg:rounded-lg">
          <div className='absolute left-[-30px] bottom-[-5%]'>
            <img className="h-28 sm:h-32 lg:h-96" src={pngHome} alt="" />
          </div>
          <figcaption className='pl-36 pr-2 pt-1 sm:pr-8 xl:pr-36'>
            <h1 className="poppins-light text-xs poppins-medium xs:text-lg sm:text-xl lg:text-4xl">Sabores inigualáveis</h1>
            <p className="text-extra-small roboto-regular lg:text-sm">Sinta o cuidado do preparo com ingredientes selecionados.</p>
          </figcaption>
        </div>
      </section>

      <div className="flex-grow w-5/6 mx-auto mb-5">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <main className='flex-grow' key={index}>
              <h1 className='mt-10 poppins-regular text-base mb-5 lg:text-xl'>{category}</h1>
              <ul className='flex relative pl-8 flex-row gap-4 overflow-x-scroll no-scrollbar lg:overflow-hidden' ref={listRef}>

                <DishList dishs={dishs} category={category} isAdmin={isAdmin} api={api} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} quantities={quantities} handleAddToCart={handleAddToCart}></DishList>
                
                <div className='hidden lg:flex items-center justify-end h-96 w-18 bg-gradient-to-l from-Dark400 to-transparent absolute top-0 right-0'>
                  <PiCaretRightBold className='w-7 h-6 cursor-pointer' onClick={scrollRight} />
                </div>
                <div className='hidden lg:flex items-center h-96 w-18 bg-gradient-to-r from-Dark400 to-transparent absolute top-0 left-8'>
                  <PiCaretLeftBold className='w-7 h-6 cursor-pointer' onClick={scrollLeft} />
                </div>
              </ul>
            </main>
          ))
        ) : (
          <div className='flex items-center justify-center my-16 gap-4 '>
            <img className='opacity-40' src={explore} alt="" />
            <p className="text-center text-lg font-roboto font-semibold text-Light700 opacity-50 ">Sem pratos cadastrados</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
