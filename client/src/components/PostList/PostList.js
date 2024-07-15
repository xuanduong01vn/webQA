import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PostItem from '../PostItem/PostItem.js';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 10;

function PostList(props){
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const isPage = queryParams.get('page');
  const isSearch = queryParams.get('search');

  const { idUser } = props;

  const [postList, setPostList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(null);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  useEffect(()=>{
    const getDataPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/posts/?isDeleted=false`);
        return await response.data;
      } catch (err) {
        console.log('Error fetching posts:', err.message);
        return [];
      }
    };
    getDataPost()
    .then((data) => {
      setPostList(data);
      if(idUser===undefined){
        if(!isSearch){
          setCurrentPosts(data);
        }
        else{
          setCurrentPosts(data.filter((item)=>removeAccents(item.title).toLowerCase().includes(isSearch.toLowerCase())));
        }
        if(!isPage){
          setCurrentPage(0);
          setItemOffset(0);
        }else{
          setCurrentPage(isPage-1);
          setItemOffset((isPage-1)*itemsPerPage);
        }
      }
      else{
        setCurrentPosts(data.filter((item)=>item.idAuthor==idUser));
      }
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[location.search, idUser]);  

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if(idUser===undefined){
      setCurrentItems(currentPosts?.slice(itemOffset, endOffset));
    }else{
      setCurrentItems(currentPosts);
    }
    setPageCount(Math.ceil(currentPosts?.length / itemsPerPage));
  }, [itemOffset, currentPosts]);

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

  useEffect(()=>{
    const getDataAuthor = async () => {
      try {
        const response = await axios.get('http://localhost:9999/accounts/');
        return response.data;
      } catch (err) {
        console.log('Error fetching authors:', err.message);
        return [];
      }
    };
    getDataAuthor()
    .then((data) => {
      setAuthorList(data);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[]); 

  let author=[];

  if(authorList && postList){
    author = authorList.filter(account => postList.some(post => post.idAuthor === account._id));
  }

  return(
    <Wrapper>
      <div id='blog-list-container'>
          {!currentPosts && <div></div>}
          {currentPosts && currentPosts?.length>0 &&
          (<ul className='blog-list-box'>
            {currentItems?.map((post, index)=>(
                <li key={post._id || index} className='blog-item'>
                  <PostItem post={post} author={author.find(acc=>acc._id==post.idAuthor)}/>
                </li>
              ))
            }
          </ul>
          )}
          {currentPosts && currentPosts?.length==0 &&
          (  
            <div className='blog-list-alert'>
              <span>Không có bài viết nào</span>
            </div>
          )}
        {!idUser && currentPosts && currentPosts?.length>itemsPerPage &&
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

export default PostList;

const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  box-sizing: border-box;
  margin-right: 18px;
  text-align: left;

  .blog-list-box{
    list-style: none;
    margin: 0%;
    padding: 0;
  }

  .blog-list-alert{
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

  .blog-item{
    margin-bottom: 16px;

    &:last-child{
      margin-bottom: 0;
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


  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    min-width: 100%;
    margin-right: 0;
  }

  /* small phone */
  @media (max-width: 480px) {
    min-width: 100%;
    margin-right: 0;
  }
  

  
`