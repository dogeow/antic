import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import localization from "config/localization";
import axios from "instance/axios";
import MaterialTable from "material-table";
import * as React from "react";

const useStyles = makeStyles(() => ({
  tableRoot: {
    overflowX: "auto",
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const tableRef = React.createRef();

  return (
    <Paper className={classes.tableRoot}>
      <MaterialTable
        tableRef={tableRef}
        columns={[
          {
            title: "标题",
            field: "title",
            editComponent: (editProps) => (
              <Input
                value={editProps.rowData.title}
                autoFocus
                onChange={(e) => editProps.onChange(e.target.value)}
              />
            ),
          },
        ]}
        onRowClick
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          sorting: true,
        }}
        title="待办事项"
        data={(query) => {
          return new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_API_URL}/todo?`;
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
        editable={
          localStorage.userId !== "1"
            ? false
            : {
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    resolve();
                  }),
                onRowUpdateCancelled: (rowData) =>
                  window.console.log("Row editing cancelled"),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    const task = {
                      project_id: 1,
                      title: newData.title,
                    };
                    axios.post("tasks", task).then(() => resolve());
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .put(`tasks/${newData.id}`, {
                        title: newData.title,
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
              }
        }
        localization={localization}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              if (newValue === oldValue) {
                resolve();
                return;
              }
              axios
                .put(`tasks/${rowData.id}`, {
                  [columnDef.field]: newValue,
                })
                .then(() => {
                  tableRef.current.onQueryChange();
                  resolve();
                });
            });
          },
        }}
      />
    </Paper>
  );
};

export default TodoList;
