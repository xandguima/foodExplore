import logo from "../../assets/logofoodexplore.svg";
import { PiReceiptBold, PiListBold, PiSignOutBold, PiMagnifyingGlass } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SlideBar } from "../SlideBar";
import { api } from "../../service/api";
import { useAuth } from "../../hooks/auth";

export function Header({ isAdmin, onSearch = () => { }, ...rest }) {

  const [search, setSearch] = useState('');
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const [quantityTotal, setQuantityTotal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('@FoodExplorer:cart')) || [];

    const initialQuantityTotal = storedCart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
    setQuantityTotal(initialQuantityTotal);
  }); // Adicionado array de dependências vazio para evitar execução infinita

  async function handleToggleAdmin() {
    const user = JSON.parse(localStorage.getItem("@FoodExplorer:user"));

    try {
      if (isAdmin) {
        await api.put("/user/role", { role: "user" });
        localStorage.setItem("@FoodExplorer:user", JSON.stringify({ ...user, role: "user" }));
      } else {
        await api.put("/user/role", { role: "admin" });
        localStorage.setItem("@FoodExplorer:user", JSON.stringify({ ...user, role: "admin" }));
      }
      window.location.reload();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  }

  function handleSignOut() {
    signOut();
  }

  function handleNavegateToNewDish() {
    navigate('/new-dish');
  }
  function handleNavegateToCart(){
    navigate('/orders')
  }

  function handleClick() {
    navigate('/');
  }

  useEffect(() => {
    onSearch(search);
  }, [search, onSearch]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <header {...rest}>
      <div className="lg:hidden flex flex-row justify-between items-center bg-Dark700 pt-5 px-5 pb-3">
        <PiListBold className="w-5 h-5 cursor-pointer" onClick={toggleModal} />
        <section
          className="flex flex-row gap-3 items-center cursor-pointer"
          onClick={handleClick}
        >
          <img className="w-5 hidden" src={logo} alt="Logo" />
          <h1 className="text-lg font-roboto font-bold text-center">
            food explorer <span className={`text-sm text-Cake200 ${isAdmin ? "" : "hidden"}`}>admin</span>
          </h1>
        </section>
        <div className="relative inline-block" onClick={handleNavegateToCart}>
          <PiReceiptBold className={`w-7 h-7 ${isAdmin ? "invisible" : ""}`}  />
          {!isAdmin && quantityTotal > 0 && (
            <span className="absolute top-0 -right-1 flex items-center justify-center h-4 w-4 text-[8px] font-bold text-white bg-Tomato100 rounded-full">
              {quantityTotal}
            </span>
          )}
        </div>
      </div>

      <SlideBar isAdmin={isAdmin === true} isOpen={isModalOpen} isClose={toggleModal} />

      <div className="hidden lg:flex flex-row justify-between items-center bg-Dark700 px-24 py-5">
        <section className="flex flex-col cursor-pointer" onClick={handleClick}>
          <div className="flex flex-row gap-3 items-center">
            <img className="w-5" src={logo} alt="Logo" />
            <h1 className="text-lg poppins-medium-bold text-center">food explorer</h1>
          </div>
          <span className={`text-xs text-Cake200 text-end ${isAdmin ? "" : "hidden"}`}>admin</span>
        </section>

        <div className="relative w-1/2">
          <input onChange={(e) => setSearch(e.target.value)} className="placeholder:text-sm pl-14 bg-Dark900 px-4 py-2 rounded-lg w-full" placeholder="Busque por pratos ou ingredientes" />
          <PiMagnifyingGlass className="absolute left-4 top-3" />
        </div>
        {
          isAdmin ?
            <CustomButton
              className={`${isAdmin ? "py-3" : ""} poppins-regular text-xs rounded`}
              title={"Novo Pedido"}
              onClick={handleNavegateToNewDish}
            /> :
            <CustomButton
              className={"poppins-regular text-xs rounded"}
              title={`Pedidos (${quantityTotal})`}
              icon={PiReceiptBold}
              onClick={handleNavegateToCart}
            />
        }
        <button
          className="hidden lg:flex flex-row items-center justify-center gap-2 px-2 py-2.5 rounded-md bg-Light700 hover:bg-Tomato200"
          onClick={handleToggleAdmin}
        >
          <p className="text-xs xl:text-md">{isAdmin ? "User" : "Admin"}</p>
        </button>

        <PiSignOutBold className="w-6 h-6 cursor-pointer" onClick={handleSignOut} />
      </div>
    </header>
  );
}
