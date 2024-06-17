import prato from '../../assets/image.png';
import logoFooter from '../../assets/logoFooter.svg';
import pngHome from '../../assets/pngHome.svg';
import { Input } from '../../components/Input';
import { Header } from "../../components/Header";
import { PiXBold, PiMagnifyingGlass } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
export function Slidebar() {

  const isAdmin = false;//Lógica para verificar se é admin

  return (
    <div className='flex flex-col items-center w-full h-screen gap-7'>
      <header className='bg-Dark700 h-16 w-full flex flex-row items-center  px-3 gap-3'>
        <PiXBold className='w-5 h-5' />
        <p className='text-lg text-end'>Menu</p>

      </header>
      <main className='w-full flex flex-col flex-grow items-center '>
        <div className="relative  w-11/12">
          <input className="placeholder:text-xs pl-10 bg-Dark900 px-4 py-2 rounded-sm w-full" placeholder="Busque por pratos ou ingredientes" />
          <PiMagnifyingGlass className="absolute left-4 top-3" />
        </div>

        <section className='flex flex-col w-full items-start mt-5 px-5'>

          <p className='text-lg '>Novo Prato</p>
          <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
          <p className='text-lg '>Sair</p>
          <div className='h-0.5 bg-Light300 w-full opacity-10'></div>

        </section>
      </main>

    <Footer />

    </div>

  )
}