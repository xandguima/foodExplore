import logo from "../../assets/logofoodexplore.svg";
import { PiReceiptBold, PiListBold, PiSignOutBold, PiMagnifyingGlass } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SlideBar } from "../SlideBar";

export function Header({ isAdmin, quantityDish = 0, ...rest }) {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  function handleNavegateToNewDish() {
    navigate('/new-dish');
  }

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
    <header>
      <div className="lg:hidden flex flex-row justify-between items-center bg-Dark700 pt-5 px-7 pb-3">
        <PiListBold className="w-5 h-5 cursor-pointer" onClick={toggleModal} />
        <section className="flex flex-row gap-3 items-center">
          <img className="w-5 hidden" src={logo} alt="" />
          <h1 className="text-lg font-roboto font-bold text-center">
            food explorer <span className={`text-sm text-Cake200 ${isAdmin ? "" : "hidden"}`}>admin</span>
          </h1>
        </section>
        <div className="relative inline-block">
          <PiReceiptBold className={`w-7 h-7 ${isAdmin ? "invisible" : ""}`} />
          {!isAdmin && quantityDish > 0 && (
            <span className="absolute top-0 -right-1 flex items-center justify-center h-4 w-4 text-[8px] font-bold text-white bg-Tomato100 rounded-full">
              {quantityDish}
            </span>
          )}
        </div>
      </div>

      <SlideBar isAdmin={isAdmin == true} isOpen={isModalOpen} isClose={toggleModal} />

      <div className="hidden lg:flex flex-row justify-between items-center bg-Dark700 px-28 py-5">
        <section className="flex flex-col">
          <div className="flex flex-row gap-3 items-center">
            <img className="w-5" src={logo} alt="" />
            <h1 className="text-lg poppins-medium-bold text-center">food explorer</h1>
          </div>
          <span className={`text-xs text-Cake200 text-end ${isAdmin ? "" : "hidden"}`}>admin</span>
        </section>

        <div className="relative w-1/2">
          <input className="placeholder:text-sm pl-14 bg-Dark900 px-4 py-2 rounded-lg w-full" placeholder="Busque por pratos ou ingredientes" />
          <PiMagnifyingGlass className="absolute left-4 top-3" />
        </div>
        {
          isAdmin ?
            <CustomButton
              className={`${isAdmin ? "py-3" : ""} poppins-regular text-xs rounded`}
              title={"Novo Pedido"}
              onClick={()=>handleNavegateToNewDish()}
            /> :
            <CustomButton
              className={"poppins-regular text-xs rounded"}
              title={`Pedidos (${quantityDish})`}
              icon={PiReceiptBold}
             
            />

        }

        <a href=""><PiSignOutBold className="w-6 h-6" /></a>
      </div>
    </header>
  );
}
