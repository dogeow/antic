import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
// import jsonServerProvider from "ra-data-json-server";
import * as React from "react";
import { Admin, Resource } from "react-admin";

import authProvider from "./authProvider";
import Dashboard from "./Dashboard";
import dataProvider from "./dataProvider";
import { PostCreate, PostEdit, PostList } from "./posts";
import { UserList } from "./users";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
