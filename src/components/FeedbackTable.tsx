import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RatingButton from './RatingButton';
import { IFeedback } from '../api/api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function FeedbackTable({ rows } : { rows: IFeedback[]}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rating</StyledTableCell>
            <StyledTableCell>Comment</StyledTableCell>
            <StyledTableCell>Browser</StyledTableCell>
            <StyledTableCell>Device</StyledTableCell>
            <StyledTableCell>Platform</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                <RatingButton isSelected rating={row.rating}/>
              </StyledTableCell>
              <StyledTableCell>{row.comment}</StyledTableCell>
              <StyledTableCell>
                  {row.browser.name} {"\n"}
                  {row.browser.version}
                </StyledTableCell>
              <StyledTableCell>{row.device}</StyledTableCell>
              <StyledTableCell>{row.platform}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
