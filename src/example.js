export default async function Example() {
  const result = await fetch('https://swapi.dev/api/people');
  return result.json();
}
