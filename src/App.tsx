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
    retry: 10, // default 3 - 재시도 옵션, true일시 무한 재시도
    retryDelay: 1000, // default 0 - 재시도 딜레이 옵션, 최대옵션 30초
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

  if (isLoading || isFetching) {
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

// enabled 옵션 값을 이용하여 지연 쿼리를 시킬 수 있다.
// useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId), enabled: shouldFetchTodo })
// 지연쿼리를 사용할때는 isInitialLoading 플래그 값을 사용하며 현재 처음 불러오는 경우에만 참이 된다.
