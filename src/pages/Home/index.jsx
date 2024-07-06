import prato from '../../assets/image.png';
import logoFooter from '../../assets/logoFooter.svg';
import pngHome from '../../assets/pngHome.svg';
import { Header } from "../../components/Header";
import { PiPlusBold, PiMinusBold, PiHeartStraightBold, PiCaretLeftBold, PiCaretRightBold, PiPencilSimple } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import React, { useRef, useState,useEffect } from 'react';

export function Home() {
  const categories = ['Entrada', 'Prato Principal', 'Sobremesa'];

  const pratos = [

    {
      id: 1,
      name: 'Patela Caranguejo',
      description: 'Caranguejo assado com arroz, feijoada e pure de batata. O pão naan dá um toque especial.',
      price: '25.00',
      image: prato,
      category: 'Entrada'
    },
    {
      id: 2,
      name: 'Salada Ravanello',
      description: 'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.',
      price: '25.00',
      image: prato,
      category: 'Prato Principal'
    },
    {
      id: 3,
      name: 'Pudim de leite',
      description: 'Pudim de leite, coberto com chocolate e morango. O pão naan dá um toque especial.',
      price: '15.00',
      image: prato,
      category: 'Sobremesa'
    },
    {
      id: 4,
      name: 'Brusqueta',
      description: 'Pão naan, batata, cogumelo e cebola. O pão naan dá um toque especial.',
      price: '35.00',
      image: prato,
      category: 'Entrada'
    },
    {
      id: 5,
      name: 'Lasanha',
      description: 'Lasanha, cogumelo, cebola e molho agridoce. O pão naan dá um toque especial.',
      price: '58.00',
      image: prato,
      category: 'Prato Principal'
    },
  ];

  const isAdmin = true; // Lógica para verificar se é admin
  const listRef = useRef(null);

  const [quantityTotal, setQuantityTotal] = useState(localStorage.getItem('quantityTotal') || 0);
  const [quantities, setQuantities] = useState({}); // Estado para quantidades por prato
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  
    localStorage.setItem('quantityTotal', quantityTotal || 0);
  },[cart]);

  function handleAddToCart(dish) {

    const existingIndex = cart.findIndex(item => item.id === dish.id);
  
    if (existingIndex !== -1) {

      // Prato já está no carrinho, atualiza a quantidade
      const updatedQuantityDish = {
        ...cart[existingIndex],
        quantity: cart[existingIndex].quantity + (quantities[dish.id] || 1)
      };
  
      setCart(prevCart => [
        ...prevCart.slice(0, existingIndex),
        updatedQuantityDish,
        ...prevCart.slice(existingIndex + 1)
      ]);
  
    } else {
      // Prato não está no carrinho, adiciona com a quantidade
      const updatedDish = { ...dish, quantity: quantities[dish.id] || 1 };
     setCart(prevCart=> [...prevCart, updatedDish]);
    }
    

    setQuantityTotal(prevTotal => prevTotal + (quantities[dish.id] || 1));
    
  };
  

  function increaseQuantity(dishId) {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [dishId]: (prevQuantities[dishId] || 1) + 1
    }));
  };

  function decreaseQuantity(dishId) {
    if (quantities[dishId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [dishId]: prevQuantities[dishId] - 1
      }));
    }
  };

  const scrollLeft = () => {
    if (listRef.current && listRef.current.scrollLeft > 0) {
      listRef.current.scrollBy({
        left: -300, // Ajuste a quantidade de scroll conforme necessário
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current && listRef.current.scrollLeft < listRef.current.scrollWidth - listRef.current.clientWidth) {
      listRef.current.scrollBy({
        left: 300, // Ajuste a quantidade de scroll conforme necessário
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header isAdmin={isAdmin} quantityDish={quantityTotal} />
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

      {categories.map((category, index) => (
        <main className='flex-grow w-5/6 mx-auto mb-5' key={index}>
          <h1 className='mt-10 poppins-regular text-base mb-5 lg:text-xl'>{category}</h1>
          <ul className='flex relative pl-8 flex-row gap-4 overflow-x-scroll no-scrollbar lg:overflow-hidden' ref={listRef}>
            {pratos.filter(dish => dish.category === category).map(dish => (
              <li key={dish.id} className='relative flex flex-col gap-3 justify-center items-center rounded-lg p-6 min-h-64 w-52 lg:w-72 bg-Dark200'>
                {isAdmin ? (
                  <PiPencilSimple className='absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' />
                ) : (
                  <PiHeartStraightBold className='absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' />
                )}

                <img className="w-20 lg:w-28" src={dish.image} alt="" />
                <div className='flex flex-col gap-2 items-center w-3/4'>
                  <a href=""><h1 className="text-xs lg:text-lg">{dish.name} &gt;</h1></a>
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
            ))}
            <div className='hidden lg:flex items-center justify-end h-96 w-18 bg-gradient-to-l from-Dark400 to-transparent absolute top-0 right-0'>
              <PiCaretRightBold className='w-7 h-6 cursor-pointer' onClick={scrollRight} />
            </div>
            <div className='hidden lg:flex items-center h-96 w-18 bg-gradient-to-r from-Dark400 to-transparent absolute top-0 left-8'>
              <PiCaretLeftBold className='w-7 h-6 cursor-pointer' onClick={scrollLeft} />
            </div>
          </ul>
        </main>
      ))}
      <Footer />
    </div>
  );
}
