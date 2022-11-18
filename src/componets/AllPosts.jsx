import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../client';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState('');

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
      .then((data) => {
        setAllPosts(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Binq Posts</h2>
      <h3>Welcome to my Binq posts page!</h3>
      <div>
        {allPostsData[0] && (
          <Link to={`/${allPostsData[0].slug.current}`}>
            <span>
              <img src={allPostsData[0].mainImage.asset.url} alt="" />
              <span>
                <h4>{allPostsData[0].title}</h4>
              </span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
