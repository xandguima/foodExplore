import prato from '../../assets/image.png';
import logoFooter from '../../assets/logoFooter.svg';
import pngHome from '../../assets/pngHome.svg';
import { Header } from "../../components/Header";
import { PiPlusBold, PiMinusBold, PiHeartStraightBold, PiCaretLeftBold, PiCaretRightBold, PiPencilSimple } from "react-icons/pi";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
export function Home() {

  const isAdmin = false;//Lógica para verificar se é admin

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header isAdmin={isAdmin}/>
      <section className="w-5/6 mx-auto mt-8 sm:mt-8 lg:mt-36">
        <div className="relative flex flex-row rounded-sm items-center justify-end max-width: 7xl h-20 bg-gradient-to-b from-LightGradient to-DarkGradient sm:h-24 lg:h-60 lg:rounded-lg">
          <div className='absolute left-[-30px] bottom-[-5%]'>
            <img className="h-28 sm:h-32 lg:h-96" src={pngHome} alt="" />
          </div>
          <figcaption className='pl-36 pr-2 pt-1 sm:pr-8 xl:pr-36 '>
            <h1 className="poppins-light text-xs poppins-medium xs:text-lg sm:text-xl lg:text-4xl">Sabores inigualáveis</h1>
            <p className="text-extra-small roboto-regular lg:text-sm">Sinta o cuidado do preparo com ingredientes selecionados.</p>
          </figcaption>
        </div>
      </section>

      <main className=' flex-grow w-5/6 mx-auto mb-5'>
        <h1 className='mt-10 poppins-regular text-base mb-5 lg:text-xl '>Refeições</h1>

        <ul className=' flex relative pl-8 flex-row gap-4 overflow-x-scroll no-scrollbar lg:overflow-hidden'>

          <li className='relative flex flex-col gap-3 justify-center items-center rounded-lg p-6  min-h-64 w-52  lg:w-72 bg-Dark200'>
            {
              isAdmin ? (
                <PiPencilSimple className='absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' />
              ) : (

                <PiHeartStraightBold className=' absolute top-2 right-2 w-10 h-7 lg:right-4 lg:top-4' />
              )
            }

            <img className="w-20 lg:w-28 " src={prato} alt="" />
            <div className='flex flex-col gap-2 items-center w-3/4'>
              <a href=""><h1 className="text-xs lg:text-lg">Salada Ravanello &gt;</h1></a>
              <div className='hidden lg:flex text-small h-10 text-center'>
                <p>Rabanetes, folhas verdes e molho agridoce salpicados com gergelim</p>
              </div>
              <p className='text-Cake200 roboto-regular text-sm lg:text-2xl'>R$ 49,97</p>
              {
                isAdmin ? (
                  null
                ) : (
                  <div className=' flex flex-col items-center gap-3 lg:flex-row'>
                    <div className='flex flex-row items-center gap-4'>
                      <PiMinusBold className="w-5" />
                      <p className=''>01</p>
                      <PiPlusBold className="w-5" />
                    </div>
                    <CustomButton className="w-full " title={"Incluir"} />

                  </div>

                )
              }
            </div>
          </li>

          <div className='hidden lg:flex items-center justify-end h-96 w-36 bg-gradient-to-l from-Dark400 to-transparent absolute top-0 right-8'>
            <PiCaretRightBold className='w-7 h-6' />
          </div>
          <div className='hidden lg:flex items-center h-96 w-36 bg-gradient-to-r from-Dark400 to-transparent absolute top-0 left-8'>
            <PiCaretLeftBold className='w-7 h-6' />
          </div>

        </ul>
      </main>

      <Footer/>


    </div>

  )
}