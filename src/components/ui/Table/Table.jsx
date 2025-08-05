import {
  Table as BaseTable,
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const Table = ({ columns, data }) => {
  if (!columns || !data || data.length === 0) {
    return <Box>Data tidak tersedia</Box>;
  }

  return (
    <TableContainer component={Paper}>
      <BaseTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.render ? column.render(row) : data[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};

Table.propTypes = {
    columns: PropTypes.array(PropTypes.object({
        id: PropTypes.any(),
        label: PropTypes.string(),
        align: PropTypes.string(),
        render: PropTypes.func,
    })),
    data: PropTypes.array(),
}

export default Table;
