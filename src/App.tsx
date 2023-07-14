import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPost, newPost } from '@services/api';

function App() {
  const titleRef = useRef<any>('');
  const bodyRef = useRef<any>('');
  const userIdRef = useRef<any>(0);
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['getPost'],
    queryFn: getPost,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['newPost'],
    mutationFn: ({
      title,
      body,
      userId,
    }: {
      title: string;
      body: string;
      userId: number;
    }) => newPost(title, body, userId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['getPost'] });
    },
  });

  const postHandler = () => {
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const userId = Number(userIdRef.current.value);
    mutation.mutate({ title, body, userId });
  };

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
      <form>
        <input ref={titleRef} type="text" placeholder="title" />
        <input ref={bodyRef} type="text" placeholder="body" />
        <input ref={userIdRef} type="number" placeholder="content" />
      </form>
      <button onClick={postHandler}>post api</button>
      {/* <button onClick={putHandler}>put api</button> */}
    </>
  );
}

export default App;
