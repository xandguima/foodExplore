export function CustomButton({ title, className,icon: Icon, ...rest }) {
  return(
    <button  className={`flex flex-row items-center justify-center gap-2 px-7 py-2 rounded-md bg-Tomato100 hover:bg-Tomato200 active:Tomato300 ${className}`}>
      {Icon && <Icon className="w-5 h-5"/>}
      {title}
      
      </button>
  )
}