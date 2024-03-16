import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className='product-block'
    speed={2}
    width={280}
    height={700}
    viewBox='0 0 280 700'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='10' y='415' rx='15' ry='15' width='255' height='230' />
    <rect x='118' y='654' rx='27' ry='27' width='152' height='40' />
    <rect x='14' y='654' rx='27' ry='27' width='88' height='40' />
    <rect x='8' y='335' rx='15' ry='15' width='255' height='70' />
    <rect x='6' y='14' rx='15' ry='15' width='260' height='310' />
  </ContentLoader>
);

export default Skeleton;
