import { Header } from "../../components/Header";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { PiXFill } from "react-icons/pi";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import qrcode from '../../assets/qrcode.png';

export function Cart() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin"; // Lógica para verificar se é admin
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('pix');

  useEffect(() => {
    const cart = localStorage.getItem('@FoodExplorer:cart');
    setCart(cart ? JSON.parse(cart) : []);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin={isAdmin} />

      <main className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 flex-grow items-center gap-24">
        <div className="flex-1 lg:mr-8">
          <section className="rounded-2xl p-4">
            {cart.length === 0 ? (
              <div className="flex items-center justify-center w-full h-96  rounded-lg opacity-50 gap-4">
                <PiXFill className="w-10 h-10" />
                <p className="text-white text-lg">Carrinho vazio</p>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => {
                    let image = `${api.defaults.baseURL}/files/${item.imgDish}`;

                    return (
                      <li key={item.id} className="flex items-center gap-3 p-4 rounded-lg">
                        <p className="text-white text-sm">{item.quantity}x</p>
                        {
                          item.imgDish ?
                            <img src={image} alt="Prato" className="w-14 h-14 object-cover rounded-lg" /> :
                            <PiXFill className="w-14 h-14 text-Dark700" />
                        }
                        <div className="flex flex-col flex-grow">
                          <p className="text-white text-sm">{item.name}</p>
                          <p className="text-Tomato200 text-xs cursor-pointer">Remover item</p>
                        </div>
                        <p className="text-white text-sm">R$ {item.price.toFixed(2)}</p>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-white text-lg mt-3 ml-6">Total: R$ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
              </>
            )}
            {cart.length > 0 && (
              <div className="mt-6 flex justify-end mb-5">
                <CustomButton className="hover:bg-Tomato300 w-44" title="Avançar" onClick={() => { navigate("/orders/payment") }} />
              </div>
            )}
          </section>
        </div>

        {cart.length > 0 && (
          <div id="tabs" className="hidden lg:block rounded-lg shadow-md w-96 border border-Light600 lg:ml-auto flex-shrink-0 mr-8">
            <div className="flex mb-4 w-full border border-Light600 rounded-lg">
              <button
                onClick={() => setActiveTab('pix')}
                className={`flex-1 py-6 px-4 border-r w-full border-Light600 ${activeTab === 'pix' ? 'bg-Dark800 text-white' : 'text-white'} rounded-l-lg focus:outline-none`}
              >
                PIX
              </button>
              <button
                onClick={() => setActiveTab('credito')}
                className={`flex-1 py-2 px-4 w-full ${activeTab === 'credito' ? 'bg-Dark800 text-white' : 'text-white'} rounded-r-lg focus:outline-none`}
              >
                Crédito
              </button>
            </div>

            {activeTab === 'pix' && (
              <div className="flex justify-center items-center h-64">
                <div className="w-48 h-48 flex justify-center items-center">
                  <img src={qrcode} alt="" className="w-44 h-44 xs:w-52 xs:h-52" />
                </div>
              </div>
            )}

            {activeTab === 'credito' && (
              <div className="flex flex-col gap-4 p-4 pb-8 w-full">
                <div className="w-full">
                  <label className="block text-xs font-medium text-white xs:text-sm">Número do Cartão</label>
                  <input
                    type="number"
                    className="mt-1 text-xs block w-full px-3 py-2 border-2 bg-transparent border-Light600 rounded-md shadow-sm focus:outline-none focus:ring-Light600 focus:border-Light600 xs:text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="flex gap-4 w-full mb-4">
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-white xs:text-sm">Validade</label>
                    <input
                      type="number"
                      className="mt-1 block w-full text-xs px-3 py-2 border-2 bg-transparent border-Light600 rounded-md shadow-sm focus:outline-none focus:ring-Light600 focus:border-Light600 xs:text-sm"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-white xs:text-sm">CVC</label>
                    <input
                      type="number"
                      className="text-xs mt-1 block w-full px-3 py-2 border-2 bg-transparent border-Light600 rounded-md shadow-sm focus:outline-none focus:ring-Light600 focus:border-Light600 xs:text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>
                <CustomButton title="Finalizar pagamento" className="w-full mt-4" />
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
