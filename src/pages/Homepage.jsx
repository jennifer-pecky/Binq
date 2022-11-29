import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Body from '../components/body/Body';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/modal';
import sanityClient from '../lib/client';
import Blog from '../components/Blog/Blog';

export default function Homepage() {
  const [stories, setStories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    FetchBlog();
  }, []);

  const FetchBlog = async () => {
    try {
      const response = await sanityClient.fetch(
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
      );

      setStories(response.slice(0, 3));
      setShowModal(false);
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }

    // sanityClient
    //   .fetch(
    //     `*[_type == "post"] {
    //           title,
    //           slug,
    //           body,
    //           mainImage{
    //               asset ->{
    //                   _id,
    //                   url
    //               },
    //               alt,
    //           }
    //       }`
    //   )
    //   .then((data) => {
    //     setStories(data.slice(0, 3));
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

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
          <Modal
            showModal={showModal}
            fetchBlog={FetchBlog}
            setShowModal={setShowModal}
          />
          {stories[0] &&
            // <Link to={`/blog/${stories[0].slug.current}`}>
            stories.map(
              (story) => (
                <Blog
                  key={story.slug.currmainImageent}
                  mainImage={story.mainImage}
                  title={story.title}
                  body={story.body}
                />
              )
              // </Link>
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
