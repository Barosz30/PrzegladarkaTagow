import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetTagsQuery } from "../../store/tagApiSlice/tagApiSlice";
import { Tag } from "../../types/Tag";
import CustomTableRow from "../customTableRow/CustomTableRow";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";

const TagsTable = () => {

    const page = useSelector((state: RootState) => state.pageSlice.page);
    const pageSize = useSelector((state: RootState) => state.pageSlice.tagsPerPage);
    const order = useSelector((state: RootState) => state.pageSlice.order)

    const { data: tagsFromServer, isLoading, isError, isFetching, refetch } = useGetTagsQuery({page, pageSize, order});

    useEffect(() => {
      refetch();
    }, [page, refetch, pageSize, order]) 


      if (isError) {
        return <div>Error fetching data</div>;
      }
    
      if (!tagsFromServer) {
        return <div>No tags available</div>;
      }

    return (
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
    )

}

export default TagsTable