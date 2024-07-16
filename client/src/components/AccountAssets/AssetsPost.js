import styled from 'styled-components';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';
import AssetsItem from './AssetItem';
import { AuthContext } from '../../AuthContext';

const itemsPerPage = 6;

function AssetsPost(props){
  const { posts, authors} = props;
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const isPage = queryParams.get('page');

  const [noQuestion,setNoQuestion]=useState(false);
  const [postList, setPostList] = useState(posts);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(null);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(()=>{
      if(!isPage){
        setCurrentPage(0);
        setItemOffset(0);
      }else{
        setCurrentPage(isPage-1);
        setItemOffset((isPage-1)*itemsPerPage);
      }
  },[location.search]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % postList.length;
    setItemOffset(newOffset);
    setCurrentPage(e.selected);
    if(e.selected==0){
      queryParams.delete('page');
      navigate(
        {
          pathname: location.pathname,
          search: queryParams.toString(),
        }
      )
    }
    else if(e.selected>0){
      queryParams.set('page',e.selected+1);
      navigate(
        {
          pathname: location.pathname,
          search: queryParams.toString(),
        }
      )
    }
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentPosts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentPosts?.length / itemsPerPage));
  }, [itemOffset, currentPosts]);

  return (
    <Wrapper>
      <div className='post-list-container'>
      <h2 className='post-container-title'>{`Bài viết (${posts?.length})`}</h2>
      {noQuestion&&
        <div className='post-list-alert'>
          <span>Chưa có bài viết nào</span>
        </div>
      }

      {!noQuestion &&
        <ul className='post-list-box'>
          {currentItems.map(p=>(
            <li key={p._id} className='post-item'>
            <AssetsItem author={authors.find(acc=>acc._id==p?.idAuthor)} post={p}/>
          </li>
          ))} 
        </ul>
      }
      {currentPosts.length>itemsPerPage &&
        <ReactPaginate
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='<'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
        }
      </div>
    </Wrapper>
  )
}

export default AssetsPost;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  .post-list-alert{
    width: 100%;
    border: 1px solid var(--shadow-color);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-size: 24px;
    color: var(--shadow-color);
  }

  .post-list-box{
    list-style: none;
    margin: 0%;
    padding: 0;
  }

  .post-item{
    border-bottom: 1px solid var(--shadow-color);
    margin-bottom: 12px;

    &:last-child{
      border-bottom: none;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .page-item {
    margin: 0 5px;
    border: 1px solid var(--shadow-color);
    border-radius: 4px;

    &:not(.disabled):hover{
      border: 1px solid var(--hightlight-color);
      opacity: 0.6;
    }

    &:not(.disabled):hover .page-link{
      color: var(--hightlight-color);
    }
  }
 
  .page-link{
    padding: 4px 12px;
    display: block;
  }

  .page-item.active {
    background-color: var(--hightlight-color);
    border: 1px solid var(--hightlight-color);

    &:hover .page-link{
      color: white;
    }

    & .page-link{
      color: white;
    }
  }

  .page-item.disabled {
    cursor: default;
    color: var(--shadow-color);

    & .page-link{
      cursor: default;
      color: var(--shadow-color);
    }
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    padding: 0 20px 0 0;

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    padding: 0 20px 0 0;

    .post-list-container{
      margin-top: 20px;
    }

    .post-container-title{
      display: none;
    }
  }

  /* small phone */
  @media (max-width: 480px) {
    padding: 0 20px;

    .post-list-container{
      margin-top: 20px;
    }

    .post-container-title{
      display: none;
    }
  }

`