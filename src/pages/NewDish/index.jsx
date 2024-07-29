import React, { useEffect, useRef, useState } from 'react';
import { PiUploadSimpleBold, PiCheckBold } from "react-icons/pi";
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { InputIngredients } from '../../components/InputIngredients';
import { useAuth } from '../../hooks/auth';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';


const categories = ['Entrada', 'Prato Principal', 'Sobremesa'];

export function NewDish() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user.rule === "admin" ? true : false;

  const fileInputRef = useRef(null);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [categoryDish, setCategoryDish] = useState(categories[0]);


  const handleIconClick = () => {
    fileInputRef.current.click();
  };



  async function handleAddDish() {
    console.log("dish", name, description, price, image, ingredients, "category = ", categoryDish);

    if (!name || !description || !price || !image || !ingredients || !categoryDish) {
      alert('Preencha todos os campos');
      return;
    }

    if (newIngredient) {
      alert('Existe um ingrediente em aberto. Adicione-o antes de salvar');
      return;
    }

    console.log("dish", name, description, price, image, ingredients, categoryDish);

    try {
      const response = await api.post("/dish", { name, description, price, category: categoryDish });

      const id = response.data?.id; // Acessando o valor do id da resposta

      // Resetando os campos após o sucesso na requisição
      setName('');
      setDescription('');
      setPrice('');
      setCategoryDish('');

      await api.post(`/ingredient/${id}`, { ingredients });

      const fileUploadForm = new FormData();
      fileUploadForm.append("imgDish", image);

      await api.patch(`/dish/imgDish/${id}`, fileUploadForm).then(() => {
        alert("Prato criado com sucesso")
        setName('');
        setDescription('');
        setPrice('');
        setCategoryDish('');
        setIngredients([]);
        setImage('');
        navigate('/');
      })

    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível cadastrar");
      }
    }
  }

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



  function handleChangeImageDish(event) {

    const file = event.target.files[0];
    setImage(file);

    //const imagePreview = URL.createObjectURL(file);
    //setAvatar(imagePreview)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin={isAdmin} />
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
                    {
                      image ? <PiCheckBold className="w-7 h-7" onClick={handleIconClick} />
                        : <PiUploadSimpleBold className="w-7 h-7" onClick={handleIconClick} />
                    }
                    <p className='text-sm'>Selecione imagem</p>
                  </div>
                  <input type="file" name="" id="" className='hidden' ref={fileInputRef} onChange={handleChangeImageDish} />
                </label>
              </div>
            </div>
            <div className='flex flex-col gap-3 w-full lg:w-2/3 '>
              <label className='text-xs lg:text-sm'>Nome</label>
              <input
                type="text"
                className="p-2 rounded w-full bg-Dark800 placeholder:text-sm h-11 rounded-lg lg:placeholder:text-base"
                placeholder='Ex.: Salada Ceasar'
                onChange={e => setName(e.target.value)}

              />
            </div>
            <div className='flex flex-col gap-3 w-full lg:w-1/3'>
              <label className='text-xs lg:text-sm'>Categoria</label>
              <select className="p-2 rounded bg-Dark800 w-full h-11 rounded-lg" onChange={e => setCategoryDish(e.target.value)}>
                {categories.map(category => (
                  <option key={category} value={category} >{category} </option>
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
                {ingredients.map((ingredient, index) => (
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
                type="number"
                className="p-[15px] rounded w-full mt-[7px] bg-Dark800 placeholder:text-xs lg:placeholder:text-base rounded-lg"
                placeholder="R$ 00.00"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className='text-xs lg:text-sm'>Descrição</label>
            <textarea
              type="text"
              className="p-2 rounded w-full h-32 bg-Dark800 mt-3 placeholder:text-xs lg:placeholder:text-base rounded-lg"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <button
            className="bg-Tomato400 text-white p-2 rounded self-end w-full lg:w-1/4 rounded-lg"
            onClick={handleAddDish}
          >
            Adicionar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
