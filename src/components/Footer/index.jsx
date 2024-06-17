import logoFooter from '../../assets/logoFooter.svg'

export function Footer() {
  return (
    <footer className=' w-full flex items-center justify-between gap-3 p-5 bg-Dark700'>

      <div className='flex items-center gap-2 lg:gap-3'>
        <img className='w-4 lg:w-5 ' src={logoFooter} alt="" />
        <p className='text-xs text-Light700 font-bold lg:text-base'>food explorer</p>
      </div>
      <p className='text-xs lg:text-base'>© 2023 - Todos os direitos reservados.</p>
    </footer>
  )

}