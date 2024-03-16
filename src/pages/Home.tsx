import React from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';

import { setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilterSlice } from '../redux/filter/selectors';
import { fetchProducts } from '../redux/product/slice';
import { SearchProductParams } from '../redux/product/types';
import { selectProductSlice } from '../redux/product/selectors';
import { useAppDispatch } from '../redux/store';

//Components
import { Skeleton, ProductBlock, Pagination } from '../components';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { currentPage, searchValue } = useSelector(selectFilterSlice);
  const { items, status } = useSelector(selectProductSlice);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getProducts = async () => {
    // const search = searchValue;
    const title = searchValue;
    dispatch(
      //Бизнес логика получения данных
      fetchProducts({
        currentPage: String(currentPage),
        title,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchProductParams;

      dispatch(
        setFilters({
          searchValue: params.title,
          currentPage: Number(params.currentPage),
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, currentPage]);

  // //Если был первый рендер, то запрашиваем данные
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getProducts();
    }
    isSearch.current = false;
  }, [searchValue, currentPage]);

  const products = items.map((obj: any) => <ProductBlock {...obj} key={obj.id} />);

  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'></div>
      <h2 className='content__title'>Все товары</h2>
      {status === 'error' ? (
        <div>
          <h2>Ошибка загрузки. Попробуйте повторить попытку позже </h2>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : products}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
