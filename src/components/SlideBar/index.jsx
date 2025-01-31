import { PiXBold, PiMagnifyingGlass } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";
import { useAuth } from "../../hooks/auth";

export function SlideBar({ isAdmin, isOpen, isClose }) {
  const { signOut } = useAuth();
  function handleSignOut() {
    signOut();
  }
  return (
    <div
      className={`fixed top-0 left-0 w-full sm:w-1/2 h-full bg-Dark700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
      <header className='bg-Dark700 h-20 w-full flex flex-row items-center pt-5 px-3 gap-3'>
        <PiXBold className='w-5 h-5 cursor-pointer' onClick={isClose} />
        <p className='text-lg text-end'>Menu</p>
      </header>
      <main className='w-full flex flex-col flex-grow items-center'>
        <div className="relative w-11/12">
          <input className="placeholder:text-xs pl-10 bg-Dark900 px-4 py-2 rounded-sm w-full" placeholder="Busque por pratos ou ingredientes" />
          <PiMagnifyingGlass className="absolute left-4 top-3" />
        </div>

        <section className='flex flex-col w-full items-start mt-5 px-5 gap-4'>

          <div className='w-full'>

            <Link to={'/'}> <p className='text-lg'>Home</p></Link>

            <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
          </div>

          {isAdmin ?
            <div className='w-full'>

              <Link to={'/new-dish'}> <p className='text-lg'>Novo Prato</p></Link>

              <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
            </div> : null
          }
          {isAdmin ? null :
            <div className='w-full'>
              <Link to={'/orders'}> <p className='text-lg'>Carrinho</p></Link>
              <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
            </div>
          }
          {isAdmin ? null :
            <div className='w-full'>
              <Link to={'/orders/payment'}> <p className='text-lg'>Pagamento</p></Link>
              <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
            </div>
          }

          <div className='w-full'>
            <p className='text-lg' onClick={handleSignOut}>Sair</p>
            <div className='h-0.5 bg-Light300 w-full opacity-10'></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
