// import Landing from './pages/Landing'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {Landing, Register, Error} from './pages'
import {Addjob, Alljobs, Profile, SharedLayout, Stats
} from './pages/dashboard'
import ProtectedRoute from './pages/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Stats />} />
        <Route path="all-jobs" element={<Alljobs />} />
        <Route path="add-job" element={<Addjob />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
