import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; //run once when you refresh the page
import { useNavigate } from "react-router-dom";
import "../App.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate(); //navigate.push >> want to change from one route to another route

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className="likeBttn"
                />
                <label>{value.Likes.length}</label>
              </div>
            </div>
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
