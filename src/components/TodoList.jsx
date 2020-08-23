import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MaterialTable from "material-table";
import React from "react";

import localization from "../config/localization";

const useStyles = makeStyles(() => ({
  tableRoot: {
    overflowX: "auto",
  },
}));

const TodoList = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.tableRoot}>
      <MaterialTable
        columns={[
          {
            title: "标题",
            field: "title",
          },
          {
            title: "优先级",
            field: "priority",
          },
        ]}
        options={{
          filtering: true,
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
            if (query.orderBy !== undefined) {
              url += `&sort=${query.orderDirection === "desc" ? "-" : ""}${
                query.orderBy.field
              }`;
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
              resolve();
            }),
          onRowUpdateCancelled: (rowData) =>
            console.log("Row editing cancelled"),
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const task = {
                project_id: 1,
                title: newData.title,
                priority: newData.priority,
              };
              axios.post("tasks", task).then(() => resolve());
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              axios
                .put(`tasks/${newData.id}`, {
                  title: newData.title,
                  priority: newData.priority,
                })
                .then(() => resolve());
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              axios
                .put(`tasks/${oldData.id}`, {
                  is_completed: 1,
                })
                .then(() => resolve());
            }),
        }}
        localization={localization}
      />
    </Paper>
  );
};

export default TodoList;
