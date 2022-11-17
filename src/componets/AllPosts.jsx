import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../client';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
            title,
            slug,
            mainImage{
               asset->{
                _id,
                url
               } 
            }
        }`
      )
      .then((data) => setAllPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Binq Posts</h2>
      <h3>Welcome to my Binq posts page!</h3>
      <div>
        {allPostsData &&
          allPostsData.map((post, index) => (
            <Link to={`/`}>
              <span key={index}>
                <img src={post.mainImage.asset.url} alt="" />
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
