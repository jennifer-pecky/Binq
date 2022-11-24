import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Body from '../components/body/Body';
import Footer from '../components/Footer/Footer';
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
        setStories(data.slice(0, 3));
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto my-20">
        <Body />
      </section>

      {!stories ? (
        <h2>loading....</h2>
      ) : (
        <>
          {stories[0] && (
            <Link to={`/blog/${stories[0].slug.current}`}>
              <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 mb">
                {stories.map((story) => (
                  <article
                    key={story.slug.current}
                    className="border border-slate-400 rounded-lg overflow-hidden hover:bg-slate-200 transition-all duration-200"
                  >
                    {story.mainImage && (
                      <img
                        src={story.mainImage.asset.url}
                        alt={story.mainImage.alt}
                        loading="lazy"
                        className="md:h-64 w-full object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h1 className="text-xl mb-2">{story.title}</h1>

                      <p className="text-sm leading-relaxed">
                        {`${story.body[0].children[0].text.substr(0, 150)}...`}
                      </p>
                    </div>
                  </article>
                ))}
              </section>
            </Link>
          )}
        </>
      )}

      <div className="max-w-7xl mx-auto px-5 mt-16 flex items-end justify-end">
        <Link
          to="/blog"
          className="bg-slate-200 py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200"
        >
          Read all my blog
        </Link>
      </div>
      <Footer />
    </>
  );
}
