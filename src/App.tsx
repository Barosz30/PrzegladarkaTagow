
import { Button, Container } from '@mui/material';
import './App.css'
import { useGetTagsQuery } from './store/apiSlice/apiSlice';
import { v4 as uuidv4 } from 'uuid';
import ChoseTagsPerPage from './components/choseTagsPerPage/ChoseTagsPerPage';


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
    <>
      <ChoseTagsPerPage />
      <Container sx={{textAlign: 'center'}}>
        {tagsFromServer.items.map(tag => (
          <Button variant='contained' sx={{m: 1}} key={uuidv4()}>{tag.name} ({tag.count})</Button>
        ))}
      </Container>
    </>
    
  );
}

export default App
