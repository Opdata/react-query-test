import './App.css';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App() {
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['getPost'],
    queryFn: () => {
      return fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) =>
        res.json()
      );
    },
  });
  const queryClient = useQueryClient();

  if (isLoading) {
    <p>isLoading...</p>;
  }

  if (!error) {
    <p>is Error</p>;
  }

  return (
    <>
      <div>
        <p>{data?.userId}</p>
        <p>{data?.id}</p>
        <p>{data?.title}</p>
        <p>{data?.body}</p>
      </div>
      {isFetching && <p>isFetching...</p>}
      <button onClick={postHandler}>post api</button>
      <button onClick={putHandler}>put api</button>
    </>
  );
}

export default App;
