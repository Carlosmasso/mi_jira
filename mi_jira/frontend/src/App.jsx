import { Route, Routes } from 'react-router-dom';
import Kanban from './pages/Kanban';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Kanban />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
  );
};

export default App;