import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

import localization from "../config/localization";

const useStyles = makeStyles(() => ({
  tableRoot: {
    overflowX: "auto",
  },
}));

const TodoList = () => {
  const classes = useStyles();

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get("todo").then(({ data }) => {
      setTodo(data);
    });
  }, []);

  return (
    <Paper className={classes.tableRoot}>
      <MaterialTable
        columns={[
          {
            title: "title",
            field: "title",
          },
        ]}
        options={{
          filtering: true,
          grouping: true,
          exportButton: true,
          selection: true,
          sorting: true,
        }}
        title="待办事项"
        data={(query) => {
          return new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_API_URL}todo?`;
            url += `page[size]=${query.pageSize}`;
            url += `&page[number]=${query.page + 1}`;
            if (query.search !== "") {
              url += `&search=${query.search}`;
            }
            if (query.filters.length !== 0) {
              query.filters.forEach((filter) => {
                url += `&filter[${filter.column.field}]=${filter.value}`;
              });
            }

            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.current_page - 1,
                  totalCount: result.total,
                });
              });
          });
        }}
        editable={{
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                /* setData([...data, newData]); */

                resolve();
              }, 1000);
            }),
          onRowUpdateCancelled: (rowData) =>
            console.log("Row editing cancelled"),
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                /* setData([...data, newData]); */

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...todo];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setTodo([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...todo];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setTodo([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
        localization={localization}
      />
    </Paper>
  );
};

export default TodoList;
