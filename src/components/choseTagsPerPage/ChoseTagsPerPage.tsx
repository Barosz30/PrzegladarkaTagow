import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { SetStateAction, useState } from "react";

function ChoseTagsPerPage() {
    const [perPage, setPerPage] = useState();

    const handleChange = () => (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setPerPage(event.target.value)
    }

    return (
    <FormControl sx={{width: 150, mb: 5}}>
        <InputLabel id="tags-per-page-label">Labels Per Page</InputLabel>
        <Select
            labelId="tags-per-page-label"
            id="tags-per-page"
            value={perPage}
            label="per-page"
            onChange={handleChange}
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
        </Select>
    </FormControl>
    )
}

export default ChoseTagsPerPage