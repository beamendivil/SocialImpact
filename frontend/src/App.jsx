import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import CommunityGoalsPage from './pages/CommunityGoalsPage.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Social Impact</h1>
        <nav className="app__nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `app__nav-link${isActive ? ' app__nav-link--active' : ''}`
            }
          >
            Main Dashboard
          </NavLink>
          <NavLink
            to="/community-goals"
            className={({ isActive }) =>
              `app__nav-link${isActive ? ' app__nav-link--active' : ''}`
            }
          >
            Community Goals
          </NavLink>
        </nav>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/community-goals" element={<CommunityGoalsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
