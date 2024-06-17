
import { Input } from "../../components/Input";
import { CustomButton } from "../../components/Button";


export function SignUp() {

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-10 lg:flex-row lg:justify-around">

      <section className="flex flex-row gap-3 items-center mb-7">
        <svg width="32" className="2xl:w-12 2xl:h-12" height="44" viewBox="0 0 39 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.6574 0L38.4133 10.8287V32.4862L19.6574 43.3149L0.901548 32.4862V10.8287L19.6574 0Z" fill="#065E7C" />
        </svg>
        <h1 className="roboto-black text-4xl 2xl:text-5xl">food explorer</h1>
      </section>

      <form className="flex flex-col gap-5 mt-5 lg:bg-Dark700 lg:p-12 rounded-2xl xl:w-2/5 2xl:max-w-xl">
        <h1 className="hidden lg:block text-3xl poppins-medium-bold text-center">Crie sua conta</h1>
        <Input
          label={"Seu Nome"}
          type="text"
          placeholder="Exemplo: Maria da Silva"
          onChange={e => setName(e.target.value)}
        />
        <Input label={"Email"}
          type="text"
          placeholder="Exemplo: exemplo@exemplo.com.br"
          onChange={e => setEmail(e.target.value)}
        />
        <Input label={"Senha"}
          type="password"
          placeholder="No mínimo 6 caracteres"
          onChange={e => setPassword(e.target.value)}
        />
        <CustomButton className="mt-5" title={"Criar conta"} />
        <a className="text-center mt-2" href="">Já tenho uma conta</a>
      </form>



    </div>



  )
}