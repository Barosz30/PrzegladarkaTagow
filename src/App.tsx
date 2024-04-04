
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import './App.css'
import { useGetTagsQuery } from './store/tagApiSlice/tagApiSlice';
import { useEffect, useState } from 'react';
import { Tag } from './types/Tag';
import CustomTableRow from './components/customTableRow/CustomTableRow';
import { Order } from './types/Order';
import SettingsSelectors from './components/settingsSelectors/SettingsSelectors';

function App() {
  
  const [tagsPerPage, setTagsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<Order>('desc');
  const { data: tagsFromServer, isLoading, isError, isFetching } = useGetTagsQuery({page, pageSize: tagsPerPage, order});

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

    console.log("niby po starcie")
  }, [])
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!tagsFromServer) {
    return <div>No tags available</div>;
  }

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
          <TableContainer sx={{overflow: 'hidden'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-cell">
                    Name
                  </TableCell>
                  <TableCell align="center">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {isFetching && (
                  tagsFromServer?.items?.map(() =>
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                  
                ))}

                {isError && !isLoading && (
                  <span>'Error fetching data'</span>
                )}

              {!isFetching && !isError && (
                  tagsFromServer?.items?.map((tag: Tag) => <CustomTableRow key={tag.name} tag={tag} />
              ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
    
  );
}

export default App
