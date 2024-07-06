import { Header } from "../../components/Header";
import prato from '../../assets/image.png';
import { PiPlusBold, PiMinusBold, PiReceiptBold } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";

export function Preview() {
  const isAdmin = true;  //Lógica para verificar se é admin;


  let totalPedido = 25.00;
  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="flex flex-col w-full min-h-screen p-5 lg:px-32 lg:py-16">
        <a className="text-xl" href="">&lt; Voltar </a>
        <main className="flex flex-grow justify-center">
          <figure className="flex flex-col justify-center items-center w-full gap-5  lg:flex-row lg:gap-10 ">

            <img className="w-48 sm:w-72 lg:w-1/3" src={prato} alt="" />

            <div className="flex flex-col items-center w-2/3  gap-5 lg:w-1/2 lg:gap-9 lg:items-start">
              <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl lg:text-start font-semibold">Salada Ravanello</h1>
              <p className="text-justify text-xs xs:text-sm lg:text-xl lg:text-justify">Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.</p>
              <section className="flex flex-wrap">
                <div className="flex flex-row items-center justify-center gap-2 bg-Dark1000 rounded-lg p-2 -mt-3">
                  <p className="text-xs ">ingredientes</p>
                </div>
              </section>
              <section className="flex flex-row items-center justify-between gap-3 lg:gap-8">
                <div className={`flex flex-row items-center justify-center gap-2 lg:gap-3 ${isAdmin ? "hidden" : ""} `} >
                  <PiMinusBold className="w-3 h-3  lg:w-5 lg:h-5" />
                  <p className="text-sm font-roboto fot-bold lg:text-lg">01</p>
                  <PiPlusBold className="w-3 h-3 lg:w-5 lg:h-5" />
                </div>
                
                <CustomButton className="text-xs lg:hidden" title={`${isAdmin ? "Editar prato" : `Pedir · R$ ${totalPedido}`} `} icon = {PiReceiptBold} />
                <CustomButton className="hidden lg:flex text-lg" title={`${isAdmin ? "Editar prato" : `incluir · R$ ${totalPedido}`}`}  />


              </section>
            </div>
          </figure>
        </main>
      </div>
      <Footer />
    </div>
  )
}