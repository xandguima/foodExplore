import logo from "../../assets/logofoodexplore.svg";
import { PiReceiptBold, PiListBold, PiSignOutBold, PiMagnifyingGlass } from "react-icons/pi";
import { CustomButton } from "../../components/Button";

export function Header({ isAdmin = false,...rest }) {
  const pedidos = ["pedido1", "pedido2", "pedido3"]


  return (
    <header>
      <div /* mobile header*/ className=" lg:hidden flex flex-row justify-between items-center bg-Dark700 pt-5 px-7 pb-3 ">
        <PiListBold className="w-5 h-5" />

        <section className="flex flex-row  gap-3 items-center">

          <img className="w-5 hidden" src={logo} alt="" />

          <h1 className="text-lg font-roboto font-bold text-center">food explorer <span className={`text-sm text-Cake200 ${isAdmin ? "" : "hidden"}`}>admin</span></h1>

        </section>

        <PiReceiptBold className={`w-5 h-5 ${isAdmin ? "invisible" : ""}`} />

      </div>

      <div /* desktop header*/ className=" hidden lg:flex flex-row justify-between items-center bg-Dark700 px-28 py-5 ">
        <section className=" flex flex-col">
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


        <CustomButton
          className={`${isAdmin ? "py-3" : ""} poppins-regular text-xs rounded`}
          title={`${isAdmin ? "Novo Pedido" : `Pedidos (${pedidos.length})`}`}
          icon={isAdmin ? null : PiReceiptBold}
        />
        <a href=""><PiSignOutBold className="w-6 h-6" /></a>
      </div>

    </header>


  )
}