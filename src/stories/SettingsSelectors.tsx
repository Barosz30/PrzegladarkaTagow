import { Box, TablePagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { SettingsProp } from "../types/SettingsProps";
import { useGetTagsQuery } from "../store/tagApiSlice/tagApiSlice";

const SettingsSelectors: React.FC<SettingsProp> = ({ tagsPerPage, setTagsPerPage, page, setPage, order, setOrder }) => {

    const { refetch } = useGetTagsQuery({page, pageSize: tagsPerPage, order});

    const searchParams = new URLSearchParams(location.search);

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
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
    );
  };

  export default SettingsSelectors;


