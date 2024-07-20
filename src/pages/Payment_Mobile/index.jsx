import { Header } from "../../components/Header";
import { CustomButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import qrcode from '../../assets/qrcode.png'

export function PaymentMobile() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin"; // Lógica para verificar se é admin

  const [activeTab, setActiveTab] = useState('pix');

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin={isAdmin} />

      <div className="flex flex-col flex-grow items-center justify-center px-8">
      
        <div className="w-full mx-auto max-w-lg">
          <div className="flex w-full">
            <h1 className="text-4xl font-bold mb-8">Pagamento</h1>
          </div>
          <div id="tabs" className="rounded-lg shadow-md w-full border border-Light600">
            <div className="flex mb-4 w-full border border-Light600 rounded-lg ">
              <button
                onClick={() => setActiveTab('pix')}
                className={`flex-1 py-6 px-4 border-r w-full border-Light600 ${activeTab === 'pix' ? 'bg-Dark800 text-white' : 'text-white'
                  } rounded-l-lg focus:outline-none`}
              >
                PIX
              </button>
              <button
                onClick={() => setActiveTab('credito')}
                className={`flex-1 py-2 px-4 w-full ${activeTab === 'credito' ? 'bg-Dark800 text-white' : 'text-white'
                  } rounded-r-lg focus:outline-none`}
              >
                Crédito
              </button>
            </div>

            {activeTab === 'pix' && (
              <div className="flex justify-center items-center h-64 ">
                <div className="w-48 h-48 flex justify-center items-center ">
                  <img src={qrcode} alt="" className="w-44 h-44 xs:w-52 xs-h-52" />
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
                <CustomButton title="Finalizar pagamento" className="w-full " /> {/* Adicionado mt-4 para margem superior */}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
