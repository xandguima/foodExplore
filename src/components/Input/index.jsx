export function Input({label, ...rest}){
  return(
    <div>
      <label className="text-left ">{label}</label>
      <input 
      className="mt-1 placeholder:text-sm bg-Dark900 px-4 py-2 rounded-lg w-full " {...rest}/>
    </div>
  )
}