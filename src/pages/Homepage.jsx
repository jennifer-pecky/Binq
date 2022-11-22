import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import sanityClient from '../lib/client';

export default function Homepage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] {
                title,
                slug,
                body,
                mainImage{
                    asset ->{
                        _id,
                        url
                    },
                    alt,
                }
            }`
      )
      .then((data) => {
        setStories(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto my-20">
        <article className="relative">
          <img
            src="https://i.pinimg.com/originals/a1/40/06/a14006cadc11c183c705a9c4f0f85a83.jpg"
            alt=""
            className="h-96 w-full object-cover rounded-2xl"
          />

          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl lg:text-5xl mb-6 text-white">
              Document Title
            </h1>

            <p className="mb-8 text-slate-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium consectetur rem, sequi officiis fugiat odit ad magnam
              similique perspiciatis aliquam voluptas inventore veniam nam eius
              pariatur, amet alias unde ducimus.
            </p>
          </div>
        </article>
      </section>

      {!stories ? (
        <h2>loading....</h2>
      ) : (
        <>
          {stories[0] && (
            <Link to={`/blog/${stories[0].slug.current}`}>
              <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5">
                <article className="border border-slate-400 rounded-lg overflow-hidden hover:bg-slate-200 transition-all duration-200">
                  {stories[0].mainImage && (
                    <img
                      src={stories[0].mainImage.asset.url}
                      alt={stories[0].mainImage.alt}
                    />
                  )}
                  <div className="p-4">
                    <h1 className="text-xl mb-2">{stories[0].title}</h1>

                    <p className="text-sm leading-relaxed">
                      {`${stories[0].body[0].children[0].text.substr(
                        0,
                        150
                      )}...`}
                    </p>
                  </div>
                </article>
              </section>
            </Link>
          )}
        </>
      )}

      <div className="max-w-7xl mx-auto px-5 mb-20 flex items-end justify-end">
        <Link
          to="/blog"
          className="bg-slate-200 py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200"
        >
          Read all my blog
        </Link>
      </div>
    </>
  );
}
