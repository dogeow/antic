// in src/users.js
import * as React from "react";
import { Datagrid, EmailField, List, TextField, UrlField } from "react-admin";

import MyUrlField from "./MyUrlField";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <MyUrlField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);
