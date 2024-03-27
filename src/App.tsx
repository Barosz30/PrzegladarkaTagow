
import './App.css'
import { useGetTagsQuery } from './store/apiSlice/apiSlice';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const { data: tagsFromServer, isLoading, isError } = useGetTagsQuery();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log()
    return <div>Error fetching data</div>;
  }

  if (!tagsFromServer) {
    return <div>No tags available</div>;
  }

  return (
    <div className="card">
      {tagsFromServer.items.map(tag => (
        <div key={uuidv4()}>{tag.name} ({tag.count})</div>
      ))}
    </div>
  );
}

export default App
