import axios from "axios";
import { useState } from "react";
import React from "react";

import { getItem } from "../helpers";
import instance from "../instance/axios";

function PostTest() {
  const [authorization, setAuthorization] = useState("");
  const [url, setUrl] = useState("");
  const [postData, setPostData] = useState("");

  const handleAuthorizationChange = (event) => {
    setAuthorization(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePostDataChange = (event) => {
    setPostData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
      withCredentials: true,
    });
    instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    instance.defaults.headers.common.Authorization = "Bearer " + authorization;

    try {
      const response = await instance.post(url, {
        content: "Hello World!",
        images: ["abc", "c"],
        tags: ["a", "b"],
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Authorization:
          <input type="text" value={authorization} onChange={handleAuthorizationChange} />
        </label>

        <label>
          URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>

        <label>
          Post Data:
          <textarea value={postData} onChange={handlePostDataChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostTest;
