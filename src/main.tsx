import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchView } from './pages/search-view'
import { DetailsView } from './pages/details-view'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/details/:id" element={<DetailsView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)