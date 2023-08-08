import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { routeTree } from '@/routes';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeTree.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            Component={route.component}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return <Routing />;
}

export default App;
