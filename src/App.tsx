
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import './App.css'
import { useGetTagsQuery } from './store/tagApiSlice/tagApiSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { Tag } from './types/Tag';
import CustomTableRow from './components/customTableRow/CustomTableRow';
import { Order } from './types/Order';


function App() {
  
  const [tagsPerPage, setTagsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<Order>('asc');
  const { data: tagsFromServer, isLoading, isError, refetch } = useGetTagsQuery({page, pageSize: tagsPerPage, order});
  console.log(tagsFromServer)

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

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    newPage++
    setPage(newPage)
    searchParams.set('page', newPage.toString());
    refetch()

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);

    setTagsPerPage(newRowsPerPage);
    setPage(1);
    
    searchParams.set('tagsPerPage', event.target.value.toString());
    searchParams.set('page', "1");
    
    refetch()
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    

  }

  const handleChangeOrder = (event: React.MouseEvent<HTMLElement>, newOrder: 'asc' | 'desc') => {
    if (newOrder !== order && newOrder !== null) {
      setOrder(newOrder);

      searchParams.set('page', "1");
      searchParams.set('order', newOrder);

      refetch()
      
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
    
  };

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
        <Paper
          sx={{
            padding: '10px',
            boxShadow: 'none',
          }}
        >
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={400}
        rowsPerPage={tagsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePerPage}
      />
      <ToggleButtonGroup
        value={order}
        exclusive
        onChange={handleChangeOrder}
        aria-label="Sorting order"
      >
        <ToggleButton value="asc" aria-label="Ascending order">
          Asc
        </ToggleButton>
        <ToggleButton value="desc" aria-label="Descending order">
          Desc
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
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

                {isLoading && (
                  <span>loading</span>
                )}

                {isError && !isLoading && (
                  <span>'Error fetching data'</span>
                )}

              {!isLoading && !isError && (
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
