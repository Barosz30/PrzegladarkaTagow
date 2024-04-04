import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setOrder, setPage, setTagsPerPage } from "../store/tableDataSlice/slice";

const useInitialQueryParams = () => {
    const dispatch = useDispatch();

    const searchParams = useMemo(() => new URLSearchParams(location.search), []);

    useEffect(() => {
      const tagsPerPageFromURL = searchParams.get("tagsPerPage");
      if (tagsPerPageFromURL) {
          dispatch(setTagsPerPage(Number(tagsPerPageFromURL)));
      }
  
      const currentPageFromURL = searchParams.get("page");
      if (currentPageFromURL) {
        dispatch(setPage(Number(currentPageFromURL)));
      }
  
      const currentOrderFromURL = searchParams.get("order");
      if (currentOrderFromURL === "asc" || currentOrderFromURL === "desc") {
        dispatch(setOrder(currentOrderFromURL));
      }
    }, [dispatch, searchParams])
}

export default useInitialQueryParams