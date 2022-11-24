import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import sanityClient from '../lib/client';
import { PortableText } from '@portabletext/react';
import Header from '../components/Header/Header';

export default function Blogpost() {
  const [blogpost, setBlogpost] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"] {
                title,
                slug,
                body,
                mainImage{
                    asset ->{
                        _id,
                        url
                    },
                    alt,
                },
                
            }`
      )
      .then((data) => {
        setBlogpost(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  // useEffect(() => {
  //   document.title = `Reading | ${blogpost.title}`;
  // }, [blogpost.title]);

  return (
    <>
      <Header />
      {blogpost && (
        <section className="py-20 px-5 max-w-3xl mx-auto">
          {blogpost.mainImage && (
            <img
              src={blogpost.mainImage.asset.url}
              alt={blogpost.mainImage.asset.url}
              className="h-2/3 w-full object-cover rounded-lg shadow"
            />
          )}

          <h1 className="capitalize md:uppercase text-xl lg:text-4xl mb-9 mt-4">
            {blogpost.title}
          </h1>

          <PortableText value={blogpost.body} />

          <div className="max-w-7xl mx-auto px-5 mt-16 flex items-end justify-end">
            <Link
              to="/blog"
              className="bg-slate-200 py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200"
            >
              Read more blog
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
