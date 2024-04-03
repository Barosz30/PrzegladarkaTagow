import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import TagProps from '../../types/TagProps';

const CustomTableRow: React.FC<TagProps> = ({ tag }) => {
  return (
    <TableRow>
      <TableCell align="center">{tag.name}</TableCell>
      <TableCell align="center">{tag.count}</TableCell>
    </TableRow>
  );
};

export default CustomTableRow;