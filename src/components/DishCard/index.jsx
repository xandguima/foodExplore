import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimple, PiHeartStraightBold, PiMinusBold, PiPlusBold } from 'react-icons/pi'; // Certifique-se de que os ícones estão corretos
import { CustomButton } from '../../components/Button'; // Importe o seu componente de botão personalizado

function DishCard({ dish, isAdmin, api, decreaseQuantity, increaseQuantity, quantities, handleAddToCart }) {
  
  const [favorite, setFavorite] = useState(dish.isFavorite);
 
  async function handleFavoriteClick() {
    try {
      if (favorite) {
        await api.delete(`/like/${dish.id}`);
        setFavorite(false);
      } else {
        await api.post("/like", { dish_id: dish.id });
        setFavorite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  }

  const imgDish = dish.imgDish ? `${api.defaults.baseURL}/files/${dish.imgDish}` : null;

  return (
    <li
      key={dish.id}
      className={`relative flex flex-col items-center justify-center rounded-lg p-6 w-52 bg-Dark200 overflow-hidden ${isAdmin ? 'h-56 lg:h-72 lg:gap-2' : 'h-72 lg:h-[23rem]'}`}
    >
      {isAdmin ? (
        <Link to={`/edit-dish/${dish.id}`}>
          <PiPencilSimple className="absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4" />
        </Link>
      ) : (
        <PiHeartStraightBold
          className={`absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4 cursor-pointer ${favorite ? 'text-red-500' : ''}`}
          onClick={handleFavoriteClick}
        />
      )}
      {imgDish ? (
        <img className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover" src={imgDish} alt={dish.name} />
      ) : (
        <div className="w-20 h-20 lg:w-28 lg:h-28 bg-Dark300 rounded-full animate-pulse"></div>
      )}
      <div className={`flex flex-col items-center justify-center flex-grow ${isAdmin ? 'gap-4' : 'gap-2'}`}>
        <div className="lg:flex text-small h-[2rem] lg:h-[1.4rem] overflow-hidden">
          <Link to={`/preview/${dish.id}`}>
            <h1 className="text-xs lg:text-sm w-full text-center px-3">{dish.name} &gt;</h1>
          </Link>
        </div>
        <div className="hidden lg:flex text-small h-16 lg:h-[2rem] overflow-hidden">
          <p className="w-full text-justify px-3">{dish.description}</p>
        </div>
        <p className="text-Cake200 roboto-regular text-sm lg:text-2xl">R$ {dish.price}</p>
      </div>
      {!isAdmin && (
        <div className={`flex flex-col items-center gap-2 lg:flex-row ${isAdmin ? 'mt-3' : 'mt-0'}`}>
          <div className="flex flex-row items-center gap-2 lg:gap-2">
            <PiMinusBold className="w-5 cursor-pointer" onClick={() => decreaseQuantity(dish.id)} />
            <p>{quantities[dish.id] || 1}</p>
            <PiPlusBold className="w-5 cursor-pointer" onClick={() => increaseQuantity(dish.id)} />
          </div>
          <CustomButton className={"w-full text-sm"} title={"Incluir"} onClick={() => handleAddToCart(dish)} />
        </div>
      )}
    </li>
  );
}

export function DishList({ dishs, category, isAdmin, api, decreaseQuantity, increaseQuantity, quantities, handleAddToCart }) {
  return (
    <ul className="flex flex-row gap-4">
      {dishs.filter(dish => dish.category === category).map(dish => (
        <DishCard
          key={dish.id}
          dish={dish}
          isAdmin={isAdmin}
          api={api}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          quantities={quantities}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </ul>
  );
}
