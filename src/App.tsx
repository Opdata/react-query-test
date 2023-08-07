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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getPost'] }),
    retry: 10, // default 3 - 재시도 옵션, true일시 무한 재시도
    retryDelay: 1000, // default 0 - 재시도 딜레이 옵션, 최대옵션 30초
  });

  // const addMutation = useMutation({
  //   mutationFn: (add) => fetch(`/api/data?add=${add}`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  // })

  // queryClient.invalidateQueries({ queryKey: ['getPost'] }); // getPost 키로 시작하는 모든 쿼리를 무효화

  // queryClient.invalidateQueries({predicate: (query) =>query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,}) // todos 키로 시작하고 version이 10 이상인 모든 쿼리를 무효화

  /**
   * Updates from Mutation Responses 예시 코드
 const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: data => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  }
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
 */

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

// pagination 참고
// https://tanstack.com/query/latest/docs/react/guides/paginated-queries

// placeholder query data
// https://tanstack.com/query/latest/docs/react/guides/placeholder-query-data
// 캐시에 지속되지 않으나 데이터를 가져오는 동안 쿼리를 성공적으로 렌더링할 수 있게 충분한 더미 데이터가 있는 경우 유용

/**
 * invalidateQueries 내부동작
 * 1. 오래된것으로 표시하며 useQuery 혹은 관련 훅에서 모든 staleTime을 재정의 한다.
 * 2. useQuery 혹은 관련 훅을 통해 렌더링되고 있을 경우 백그라운드에서도 다시 가져온다.
 * 3. 즉시 해당 쿼리를 다시 요청하는건 아니고, 다음 렌더링 사이클에서 쿼리가 필요로하는 상태에 따라 새로운 요청을 시작한다.
 * 4. 무효화된 쿼리는 캐시에 여전히 존재하지만, 유효하지 않는 데이터로 표시된다.
 * 5. 동일한 키에서 특정 쿼리만 무효화 하고 싶다면, 해당 쿼리가 사용하는 변수 등 동일하게 맞춰주면 해당 쿼리만 무효화를 진행한다.
 * 6. 혹은 변수나 서브키가 없는 쿼리만 무효화 하고 싶다면 exact: true로 옵션을 추가해준다.
 * 7. 더 구체적인 무효화 조건을 넣고 싶다면 아래같은 방식으로 적용하면 된다.
 *
 */

//
/**
 * Updates from Mutation Responses 의 주의사항은 아래와 같다.
 * 이 방법은 post, put 등 데이터 변경을 요청하였을때 서버로 부터 응답을 받기 전 프론트단의 캐시를 직접 조작하여 불필요한 네트워크 요청을 줄이는 방법이다.
 * 하지만, 여기서 데이터에 대한 일관성이 보장될때만 사용하는 편이 좋다. / 데이터 변경 후 예상과 다른 데이터가 온다던지 했을때에는 문제가 발생하기 때문에 데이터에 정말 필수적으로 의지되야 하는 화면을 그릴때에는 지양하는것이 좋을거라고 생각된다.
 *
 */

// Optimistic-updates 요청에 대한 문제가 생겼을때 롤백 관련 기능
// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates

// Query Cancellation - http abortcontroller 과 같은 기능 제공 / 하지만 axios 요청코드 부분에서 직접 해주는게 좋을듯
// https://tanstack.com/query/latest/docs/react/guides/query-cancellation
