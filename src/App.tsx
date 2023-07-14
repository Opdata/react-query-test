import './App.css';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App() {
  const queryClient = useQueryClient();

  const postHandler = async () => {};
  const putHandler = async () => {};

  return (
    <>
      <div></div>
      <button onClick={postHandler}>post api</button>
      <button onClick={putHandler}>put api</button>
    </>
  );
}

export default App;
