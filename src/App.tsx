import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeForm from './Components/ResumeForm';
import { ResumeProvider } from './Services/ResumeContext';
import ResumeImprovement from './Components/ResumeImprovement';
import Navigation from './Components/Navigation';

const App = () => {
  return (
    <ResumeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ResumeForm />} />
          <Route path="/improve" element={<ResumeImprovement />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
};

export default App;