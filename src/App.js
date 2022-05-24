import { useQuery } from 'react-query';
import Example from './example';

function App() {
  // Queries
  const { isLoading, data } = useQuery('data', Example);
  // console.log(isLoading, error, data);
  // console.log(data.results);
  return (
    <div>
      <ul>
        {!isLoading &&
          data.results.map((obj, index) => {
            return (
              <div key={index}>
                <div>{obj.name}</div>
                <div>{obj.edited}</div>
                <div>{obj.url}</div>
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
