import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

const PoweredBy = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [paginate, setPaginate] = useState({});

  React.useEffect(() => {
    axios
      .get(`powered-by?page[number]=${page + 1}&page[size]=${size}`)
      .then(({ data }) => {
        setData(data.data);
        delete data.data;
        setPaginate(data);
      });
  }, [page, size]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 15));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="dense table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>分类</TableCell>
              <TableCell>备注</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.link ? (
                    <a
                      href={row.link}
                      target="_blank"
                      color="primary"
                      rel="noopener noreferrer"
                    >
                      {row.name}
                    </a>
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25]}
        component="div"
        count={paginate.total || 0}
        rowsPerPage={size}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "每页行数" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div>
        <p>
          <a
            href="https://validator.w3.org/nu/?doc=https%3A%2F%2F233.sx%2F"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              style={{ border: 0, width: 88, height: 31 }}
              src="https://www.w3.org/Icons/valid-xhtml20.gif"
              alt="Valid HTML!"
            />
          </a>
          <a
            href="http://jigsaw.w3.org/css-validator/validator?uri=233.sx&profile=css3svg&usermedium=all&warning=1&vextwarning="
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              style={{ border: 0, width: 88, height: 31 }}
              src="http://jigsaw.w3.org/css-validator/images/vcss"
              alt="Valid CSS!"
            />
          </a>
        </p>
      </div>
    </div>
  );
};

export default PoweredBy;
