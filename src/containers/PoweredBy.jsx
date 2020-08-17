import React, { useState } from "react";
import MaterialTable from "material-table";

export default function Table() {
  const [project, setProject] = useState([]);

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "name",
            field: "name",
            render: (rowData) => (
              <a
                href={rowData.link}
                target="_blank"
                color="primary"
                rel="noopener noreferrer"
              >
                {rowData.name}
              </a>
            ),
          },
          { title: "分类", field: "category" },
          { title: "链接", field: "link" },
          { title: "备注", field: "note" },
        ]}
        options={{
          filtering: true,
          grouping: true,
          exportButton: true,
          selection: true,
          sorting: true,
        }}
        title="Powered by"
        data={(query) => {
          return new Promise((resolve, reject) => {
            let url = `${process.env.REACT_APP_API_URL}powered-by?`;
            url += `page[size]=${query.pageSize}`;
            url += `&page[number]=${query.page + 1}`;
            if (query.search !== "") {
              url += `&search[name]=${query.search}`;
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
                const dataUpdate = [...project];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setProject([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...project];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setProject([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
        localization={{
          pagination: {
            labelRowsSelect: "行",
            labelDisplayedRows: "{from}-{to} of {count}",
            firstTooltip: "第一页",
            firstAriaLabel: "第一页",
            nextAriaLabel: "下一页",
            nextTooltip: "下一页",
            previousTooltip: "上一页",
            previousAriaLabel: "上一页",
            lastTooltip: "最后一页",
            lastAriaLabel: "最后一页",
          },
          toolbar: {
            nRowsSelected: "选择了 {0} 行",
            searchTooltip: "搜索",
            searchPlaceholder: "搜索",
            exportTitle: "导出",
            exportAriaLabel: "导出",
          },
          header: {
            actions: "操作",
          },
          body: {
            editTooltip: "编辑",
            deleteTooltip: "删除",
            addTooltip: "添加",
            emptyDataSourceMessage: "无记录可显示",
            editRow: {
              saveTooltip: "保存",
              cancelTooltip: "取消",
              deleteText: "您确定要删除此行吗？",
            },
            filterRow: {
              filterTooltip: "Filter",
            },
          },
        }}
      />
      <div>
        <p>
          <a
            href="https://validator.w3.org/nu/?doc=https%3A%2F%2F233.sx%2F"
            target="_blank"
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
            target="_blank"
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
}
