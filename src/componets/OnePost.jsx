import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../client.js';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';
import { data } from 'autoprefixer';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostdata] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_slug.current == $slug]{
        title,
        slug,
        mainImage{
          asset ->{
            _1d,
            url
          }
        },
        body,
        "name": author->name,
        "authorImage": author->image
      }`,
        { slug }
      )
      .then((data) => setPostdata(data[0]))
      .catch(console.error);
  }, [slug]);

  return (
    <div>
      <div>
        <h2>{postData.title}</h2>
        <div>
          <img
            src={urlFor(postData.authorImage).width(100).url()}
            alt="Author is Kap"
          />
          <h4>{postData.name}</h4>
        </div>
      </div>
      <img src={urlFor(postData.mainImage).width(200).url()} alt="" />
      <div>
        <BlockContent
          blocks={postData.body}
          projectId="2aaobsus"
          dataset="production"
        />
      </div>
    </div>
  );
}
