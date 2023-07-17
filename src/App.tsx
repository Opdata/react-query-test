import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { newPostType } from '@services/api';
import { getPost, newPost } from '@services/api';

function App() {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: ['getPost'],
    queryFn: getPost,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['newPost'],
    mutationFn: ({ title, body, userId }: newPostType) => {
      return newPost(title, body, userId);
    },
  });

  // const addMutation = useMutation({
  //   mutationFn: (add) => fetch(`/api/data?add=${add}`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  // })

  const postHandler = () => {
    if (!titleRef.current || !bodyRef.current || !userIdRef.current) return;
    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;
    const userId = Number(userIdRef.current?.value);
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
      <button onClick={() => refetch()}>refetch button</button>
      {/* <button onClick={putHandler}>put api</button> */}
    </>
  );
}

export default App;

// 개별 id별 api 요청 예시
// useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
// useQuery({queryKey: ['todos', todoId],queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),});
