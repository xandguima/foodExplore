import React, { useRef, useState } from 'react';
import { PiUploadSimpleBold } from "react-icons/pi";
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { InputIngredients } from '../../components/InputIngredients';

const categories = ['Entrada', 'Prato Principal', 'Sobremesa'];

export function NewDish() {
  const [newIngredient, setNewIngredient] = useState('');
  const [Ingredients, setIngredients] = useState([]);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  function handleAddIngredient() {
    if (!newIngredient) {
      alert('Sem ingrediente');
      return;
    };

    setIngredients(prevState => [newIngredient, ...prevState]);
    setNewIngredient('');
  };

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow px-4 pt-6 mb-10">
        <a className="text-sm lg:text-base" href="/">&lt; Voltar </a>
        <h1 className="text-2xl font-semibold my-4">Novo Prato</h1>

        <div className="flex flex-col space-y-4 lg:space-y-4 px-4">
          <div className="flex flex-col lg:flex-row lg:space-x-4 lg:items-center ">
            <div className="relative w-full lg:w-1/4">
              <label htmlFor="file" className='text-xs lg:text-sm'>Imagem do Prato</label>
              <div className='flex items-center justify-center w-full mt-3 '>
                <label className='w-full h-full cursor-pointer'>
                  <div className='flex items-center gap-2 pl-5 bg-Dark800 rounded-lg p-2'>
                    <p><PiUploadSimpleBold className="w-7 h-7" onClick={handleIconClick} /></p>
                    <p className='text-sm'>Selecione imagem</p>
                  </div>
                  <input type="file" name="" id="" className='hidden' ref={fileInputRef} />
                </label>
              </div>
            </div>
            <div className='flex flex-col gap-3 w-full lg:w-2/3 '>
              <label className='text-xs lg:text-sm'>Nome</label>
              <input
                type="text"
                className="p-2 rounded w-full bg-Dark800 placeholder:text-sm h-11 rounded-lg lg:placeholder:text-base"
                placeholder='Ex.: Salada Ceasar'
              />
            </div>
            <div className='flex flex-col gap-3 w-full lg:w-1/3'>
              <label className='text-xs lg:text-sm'>Categoria</label>
              <select className="p-2 rounded bg-Dark800 w-full h-11 rounded-lg">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="w-full lg:w-2/3 flex flex-col gap-3">
              <label htmlFor="ingredients" className="text-xs lg:text-sm">Ingrentes</label>
              <section className="w-full flex flex-wrap gap-2 bg-Dark800 rounded-lg p-2 ">
                <InputIngredients
                  isNew
                  placeholder="Tamanho"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onClick={handleAddIngredient}
                />
                {Ingredients.map((ingredient, index) => (
                  <InputIngredients
                    key={index}
                    value={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                ))}
              </section>
            </div>
            <div className="w-full lg:w-1/3 ">
              <label className='text-xs lg:text-sm'>Preço</label>
              <input
                type="text"
                className="p-[15px] rounded w-full mt-[7px] bg-Dark800 placeholder:text-xs lg:placeholder:text-base rounded-lg"
                placeholder="R$ 00.00"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className='text-xs lg:text-sm'>Descrição</label>
            <textarea
              type="text"
              className="p-2 rounded w-full h-32 bg-Dark800 mt-3 placeholder:text-xs lg:placeholder:text-base rounded-lg"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            />
          </div>

          <button className="bg-Tomato400 text-white p-2 rounded self-end w-full lg:w-1/4 rounded-lg">
            Adicionar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
