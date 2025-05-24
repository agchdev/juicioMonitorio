
function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-light">TerkanianLaw</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="uppercase text-sm tracking-wider">Services</a>
          <a href="#" className="uppercase text-sm tracking-wider">About</a>
          <a href="#" className="uppercase text-sm tracking-wider">Articles</a>
          <a href="#" className="uppercase text-sm tracking-wider">Contacts</a>
        </nav>
        <button className="hidden md:flex items-center space-x-2 uppercase text-sm tracking-wider">
          <span>Get in touch</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-light leading-tight mb-8">
            YOU RUN YOUR<br />
            BUSINESS.
            <span className="block text-[#e6c9a5] mt-4">WE'LL PROTECT IT.</span>
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-gray-400 mb-12">
              We understand the difficulties and stress that your legal issues bring. Our team is committed to providing you with the individual attention, communication, and dedication you deserve.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <button className="bg-[#e6c9a5] text-black rounded-full p-8 flex flex-col items-center justify-center hover:bg-[#d4b78f] transition duration-300">
                <span className="uppercase text-sm font-medium">Request</span>
                <span className="uppercase text-sm font-medium">Consultation</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="container mx-auto px-4 relative">
        <div className="w-full h-96 md:h-[500px] bg-gray-800 rounded-t-lg overflow-hidden">
          {/* Aquí iría la imagen del edificio judicial/columnas */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
        </div>
        
        {/* Testimonial Card */}
        <div className="absolute bottom-8 right-12 bg-white text-black p-6 rounded-lg shadow-xl max-w-md">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
              {/* Aquí iría la foto del fundador */}
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                Our focus is on building relationships with our clients and making sure they understand how the law impacts their business.
              </p>
              <div className="text-[#d4b78f] font-medium">JANE CARTER</div>
              <div className="text-xs text-gray-500">FOUNDER</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
