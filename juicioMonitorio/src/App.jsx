
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import UploadForm from './components/UploadFormNew'
import Home from './page/Home'
import Form from './page/Form'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="espacios" element={<div>Página de Espacios</div>} />
          <Route path="la-marca" element={<div>Página de La Marca</div>} />
          <Route path="noticias" element={<div>Página de Noticias</div>} />
          <Route path="contacto" element={<div>Página de Contacto</div>} />
          <Route path="formulario" element={<Form />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
