import {PiPlus, PiX} from 'react-icons/pi'



export function InputIngredients({isNew,value,className, onClick,...rest}) {
  return (
    <div className={`flex w-full md:w-1/5 rounded-md h-9 ${isNew ? 'border-2 border-dashed border-Light500' : 'bg-Light600'}`} >
      <input
      className='w-full text-xs lg:text-base font-semibold border-none hover:border-none pl-2 p-1 outline-none  placeholder:text-white'
      style={{backgroundColor:'transparent'}}
      type='text'
      value={value}
      placeholder='Ingrediente'
      isNew={isNew}
      readOnly={!isNew}
      {...rest}
      />
        
      
      <button
      className={`py-2 px-2 rounded ${isNew ? 'text-Light500' : 'text-white'}`}
      type='button'

      onClick={onClick}>
        {isNew ? <PiPlus/> : <PiX/>}

      </button>
      
    </div>
  )
}