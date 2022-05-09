import Paper from '@mui/material/Paper';
import { default as _Table } from '@mui/material/Table';
import { default as _TableBody } from '@mui/material/TableBody';
import { default as _TableCell } from '@mui/material/TableCell';
import { default as _TableContainer } from '@mui/material/TableContainer';
import { default as _TableHead } from '@mui/material/TableHead';
import { default as _TableRow } from '@mui/material/TableRow';
import React from 'react';

const Table = (props) => (
  <_TableContainer component={Paper}>
    <_Table sx={{ minWidth: 650 }} {...props} />
  </_TableContainer>
);

const TH = (props) => <_TableHead {...props} />;

const TB = (props) => <_TableBody {...props} />;

const TR = (props) => <_TableRow {...props} />;

const TD = (props) => <_TableCell {...props} />;

export { Table, TH, TB, TR, TD };

