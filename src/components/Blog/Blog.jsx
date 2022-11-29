import React, { forwardRef } from 'react';

const Blog = forwardRef(({ mainImage, title, body }) => {
  return (
    <>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 mb">
        <article className="border border-slate-400 rounded-lg overflow-hidden hover:bg-slate-200 transition-all duration-200">
          {mainImage && (
            <img
              src={mainImage.asset.url}
              alt={mainImage.alt}
              loading="lazy"
              className="md:h-64 w-full object-cover"
            />
          )}
          <div className="p-4">
            <h1 className="text-xl mb-2">{title}</h1>

            <p className="text-sm leading-relaxed">
              {`${body[0].children[0].text.substr(0, 150)}...`}
            </p>
          </div>
        </article>
      </section>
    </>
  );
});

export default Blog;
