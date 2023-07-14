const getPost = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) =>
    res.json()
  );
};

const newPost = (title: string, body: string, userId: number) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export { getPost, newPost };
