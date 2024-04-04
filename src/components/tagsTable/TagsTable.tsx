import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetTagsQuery } from "../../store/tagApiSlice/tagApiSlice";
import { Tag } from "../../types/Tag";
import CustomTableRow from "../customTableRow/CustomTableRow";
import { TagTableProps } from "../../types/TagTableProps";

const TagsTable: React.FC<TagTableProps> = ({ pageSize, page, order }) => {

    const { data: tagsFromServer, isLoading, isError, isFetching } = useGetTagsQuery({page, pageSize, order});


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