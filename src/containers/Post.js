import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Post = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('post')
      .then(response => {
        setPost(response.data);
      })
  }, []);

  return (
    <div>
      {
        post.map((item, index) => (
          <div key={index}><Link to={`/post/${item.id}`}>{item.title}</Link></div>
        ))
      }
    </div>
  )
};

export default Post;
