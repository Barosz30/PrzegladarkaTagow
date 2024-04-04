
import {
  Box,
  Paper,
} from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';
import { Order } from './types/Order';
import SettingsSelectors from './components/settingsSelectors/SettingsSelectors';
import TagsTable from './components/tagsTable/TagsTable';

function App() {
  
  const [tagsPerPage, setTagsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<Order>('desc');

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const tagsPerPageFromURL = searchParams.get("tagsPerPage");
    if (tagsPerPageFromURL) {
        setTagsPerPage(Number(tagsPerPageFromURL));
    }

    const currentPageFromURL = searchParams.get("page");
    if (currentPageFromURL) {
      setPage(Number(currentPageFromURL));
    }

    const currentOrderFromURL = searchParams.get("order");
    if (currentOrderFromURL === "asc" || currentOrderFromURL === "desc") {
      setOrder(currentOrderFromURL);
    }

  }, [])
  
  

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
        <Paper
          sx={{
            padding: '10px',
            boxShadow: 'none',
          }}
        >
         <SettingsSelectors
            tagsPerPage={tagsPerPage} 
            setTagsPerPage={setTagsPerPage} 
            page={page} 
            setPage={setPage} 
            order={order} 
            setOrder={setOrder}
          />

          <TagsTable
            pageSize={tagsPerPage}
            page={page}
            order={order}
          />
          
        </Paper>
      </Box>
    </>
    
  );
}

export default App
