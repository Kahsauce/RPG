import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import TrainingCoach from './pages/TrainingCoach';
import DietCoach from './pages/DietCoach';
import InjuryCoach from './pages/InjuryCoach';
import Competition from './pages/Competition';
import Settings from './pages/Settings';
import Stats from './pages/Stats';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="training-coach" element={<TrainingCoach />} />
        <Route path="diet-coach" element={<DietCoach />} />
        <Route path="injury-coach" element={<InjuryCoach />} />
        <Route path="competitions" element={<Competition />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;