import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; //run once when you refresh the page
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate(); //navigate.push >> want to change from one route to another route

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
            <div>
              Post: #{key} and DB: {value.id}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
