import {
  Box,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ChangeEvent } from "react";
import {
  setOrder,
  setPage,
  setTagsPerPage,
} from "../../store/tableDataSlice/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SettingsSelectors = () => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pageSlice.page);
  const tagsPerPage = useSelector(
    (state: RootState) => state.pageSlice.tagsPerPage
  );
  const order = useSelector((state: RootState) => state.pageSlice.order);

  const searchParams = new URLSearchParams(location.search);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage + 1));
    searchParams.set("page", (newPage + 1).toString());

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleChangeTagsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value);

    dispatch(setTagsPerPage(newRowsPerPage));
    dispatch(setPage(1));

    searchParams.set("tagsPerPage", event.target.value.toString());
    searchParams.set("page", "1");

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleChangeOrder = (
    _event: React.MouseEvent<HTMLElement>,
    newOrder: "asc" | "desc"
  ) => {
    if (newOrder !== order && newOrder !== null) {
      dispatch(setOrder(newOrder));

      searchParams.set("order", newOrder);

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={400}
        rowsPerPage={tagsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeTagsPerPage}
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
