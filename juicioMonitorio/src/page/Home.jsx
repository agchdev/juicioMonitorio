import { Link } from 'react-router-dom'
import BannerImage from '../components/BannerImage'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-16 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                Resuelve tu <span className="text-blue-900">Juicio Monitorio</span> con ayuda profesional
              </h1>
              <p className="mt-6 text-xl text-gray-800 leading-relaxed">
                Te ayudamos a gestionar y resolver tu juicio monitorio de forma rápida, 
                sencilla y con la máxima garantía legal. Nuestros expertos están aquí para ti.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/formulario" 
                  className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 text-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                >
                  Comenzar ahora
                </Link>
                <button className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold py-4 px-8 text-lg transition-all duration-300">
                  Más información
                </button>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="bg-white  shadow-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 l flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-black">Proceso simplificado</h3>
                </div>
                <p className="text-gray-800 mb-4">
                  Completa nuestro formulario y recibe asesoramiento personalizado en menos de 24 horas.
                </p>
                <div className="text-sm text-gray-700">
                  ✓ Sin costes ocultos<br/>
                  ✓ Atención personalizada<br/>
                  ✓ Resultados garantizados
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              ¿Por qué elegirnos para tu juicio monitorio?
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Contamos con años de experiencia ayudando a personas como tú a resolver sus problemas legales de forma eficiente.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 l flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Experiencia probada</h3>
              <p className="text-gray-800">Más de 1000 casos resueltos exitosamente</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 l flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Proceso rápido</h3>
              <p className="text-gray-800">Respuesta en menos de 24 horas</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 l flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Asesoramiento experto</h3>
              <p className="text-gray-800">Equipo de abogados especializados</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 l flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Atención personalizada</h3>
              <p className="text-gray-800">Cada caso recibe atención individual</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Cómo funciona nuestro proceso
            </h2>
            <p className="text-xl text-gray-800">
              En solo 3 pasos simples, comenzarás el camino hacia la resolución de tu juicio monitorio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 text-white l flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Completa el formulario</h3>
              <p className="text-gray-800">
                Proporciona los detalles básicos de tu caso a través de nuestro formulario seguro y fácil de usar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 text-white l flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Recibe asesoramiento</h3>
              <p className="text-gray-800">
                Nuestro equipo de expertos analizará tu caso y te proporcionará una estrategia personalizada.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 text-white l flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Resuelve tu problema</h3>
              <p className="text-gray-800">
                Te acompañamos durante todo el proceso hasta conseguir la mejor resolución posible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Imagen a la izquierda */}
            <div className="order-2 md:order-1">
              <BannerImage className="w-full" />
            </div>
            
            {/* Texto a la derecha */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Juicio Monitorio - Tu solución legal
              </h2>
              <p className="text-xl text-gray-800 mb-6">
                Contamos con el conocimiento y experiencia para ayudarte en todo el proceso de reclamación judicial de deudas.
              </p>
              <p className="text-gray-700 mb-6">
                Nuestro equipo de abogados especializados está listo para asistirte en la resolución de tu juicio monitorio, ofreciéndote las mejores estrategias legales adaptadas a tu situación particular.
              </p>
              <div className="mt-6">
                <Link 
                  to="/contacto" 
                  className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 text-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl inline-block"
                >
                  Consulta gratuita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            No esperes más para resolver tu juicio monitorio
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Cada día que pasa puede complicar más tu situación. Actúa ahora y obtén la ayuda profesional que necesitas.
          </p>
          <Link 
            to="/formulario" 
            className="inline-block bg-white text-blue-900 hover:bg-gray-900 hover:text-white font-bold py-4 px-8 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Comenzar mi consulta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
