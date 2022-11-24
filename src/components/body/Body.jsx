import React from 'react';
import './body.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Screenshot from 2022-11-06 10-19-04.png';

export default function Body() {
  return (
    <>
      <div>
        <div className="slide">
          <Link to={'/blog'}>
            <a>
              <img src={img} alt="" />
            </a>
          </Link>

          <div className="slide1">
            <Link href={'/'}>
              <a>
                {' '}
                <span>Business, Travel</span> - Jun 3,2022{' '}
              </a>
            </Link>

            <Link href={'/'}>
              <h1>
                Your most unhappy <br /> customers are your <br /> greatest
                source of <br /> learning
              </h1>
            </Link>

            <p className="text-gray-600 py-3">
              Even the all-powerful pointing has no control about the the blind
              texts it is an almost <br /> unorthographic life, One day however
              a small line of blind text by the name of lorem <br /> ipsum
              decided to leave for the far world of Grammer..
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
