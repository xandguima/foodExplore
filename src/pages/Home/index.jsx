import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { api } from '../../service/api';
import logo from '../../assets/image.png';
import explore from '../../assets/logoFooter.svg'
import pngHome from '../../assets/pngHome.svg';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CustomButton } from "../../components/Button";
import { PiPlusBold, PiMinusBold, PiHeartStraightBold, PiCaretLeftBold, PiCaretRightBold, PiPencilSimple } from "react-icons/pi";
import { Link } from 'react-router-dom';

export function Home() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [dishs, setDishs] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  const { user } = useAuth();
  const isAdmin = user.role === 'admin';
  const listRef = useRef(null);

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
                {dishs.filter(dish => dish.category === category).map(dish => {
                  const imgDish = dish.imgDish ? `${api.defaults.baseURL}/files/${dish.imgDish}` : logo;

                  return (
                    <li key={dish.id} className='relative flex flex-col gap-3 justify-center items-center rounded-lg p-6 min-h-64 w-52 lg:w-72 bg-Dark200'>
                      {isAdmin ? (
                       <Link to={`/edit-dish/${dish.id}`}> <PiPencilSimple className='absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' /></Link>
                      ) : (
                        <PiHeartStraightBold className='absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' />
                      )}
                      <img className="w-20 lg:w-28" src={logo} alt={dish.name} />
                      <div className='flex flex-col gap-2 items-center w-3/4'>
                        <Link to={`/preview/${dish.id}`}><h1 className="text-xs lg:text-lg">{dish.name} &gt;</h1></Link>
                        <div className='hidden lg:flex text-small h-10 text-center'>
                          <p>{dish.description}</p>
                        </div>
                        <p className='text-Cake200 roboto-regular text-sm lg:text-2xl'>R$ {dish.price}</p>
                        {!isAdmin && (
                          <div className='flex flex-col items-center gap-3 lg:flex-row'>
                            <div className='flex flex-row items-center gap-4'>
                              <PiMinusBold className="w-5 cursor-pointer" onClick={() => decreaseQuantity(dish.id)} />
                              <p>{quantities[dish.id] || 1}</p>
                              <PiPlusBold className="w-5 cursor-pointer" onClick={() => increaseQuantity(dish.id)} />
                            </div>
                            <CustomButton className="w-full " title={"Incluir"} onClick={() => handleAddToCart(dish)} />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
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
            <img className='opacity-40' src={explore}alt="" />
            <p className="text-center text-lg font-roboto font-semibold text-Light700 opacity-50 ">Sem pratos cadastrados</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
