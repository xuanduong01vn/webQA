import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 10;

function DashboardComment(){
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const isDeleted = queryParams.get('isDeleted');
  const isPage = queryParams.get('page');
  
  const [cmtList, setCmtList] = useState(null);
  const [accList, setAccList] = useState([]);
  const [stateCmt, setStateCmt] = useState('');
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(null);
  const [currentCmts, setCurrentCmts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(()=>{
    const getDataCmt = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/comments?sort=createAt`);
        return response.data;
      } catch (err) {
        console.log('Error fetching authors:', err.message);
        return [];
      }
    };
    getDataCmt()
    .then((data) => {
      setCmtList(data);
      if(!isPage){
        setCurrentPage(0);
        setItemOffset(0);
      }else{
        setCurrentPage(isPage-1);
        setItemOffset((isPage-1)*itemsPerPage);
      }
      if(!isDeleted){
        setStateCmt('all');
        setCurrentCmts(data);
      }
      else if(isDeleted=='false'){
        setStateCmt('active');
        setCurrentCmts(data.filter(cmt=>cmt.isDeleted==false));
      }
      else if(isDeleted=='true'){
        setStateCmt('deleted');
        setCurrentCmts(data.filter(cmt=>cmt.isDeleted==true));
      }
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[location.search]); 

  function handleStateCmt(state){
    setCurrentPage(0);
    setItemOffset(0);
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCmts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCmts?.length / itemsPerPage));
  }, [itemOffset, currentCmts, stateCmt]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % cmtList.length;
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
    const getDataAcc = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/accounts`);
        return response.data;
      } catch (err) {
        console.log('Error fetching authors:', err.message);
        return [];
      }
    };
    getDataAcc()
    .then((data) => {
      setAccList(data || []);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[]); 

  const now= new Date();
  function formatTime(time){
    if(now.getFullYear()== new Date(time).getFullYear()){
      return format(new Date(time), 'HH:mm, EEEE, dd MMM', { locale: vi });
    }
    else{
      return format(new Date(time), 'HH:mm, EEEE, dd MMM yyyy', { locale: vi });
    }
  }
  
  return (
    <Wrapper>
      <div className='dashboard-post-container'>
        <div className='dashboard-add-new'>
          <h3>Quản lý bình luận</h3>
        </div>
        
        <div className='dashboard-filter'>
          {cmtList && 
          (
            <ul className='dashboard-filter-list'>
              <li onClick={()=>handleStateCmt('all')} 
              className={stateCmt=='all'?'dashboard-filter-item active':'dashboard-filter-item'}>
                <Link to='/dashboard/comments' className='filter-item-link'>Tất cả {`(${cmtList?.length})`}</Link>
              </li>
              <li onClick={()=>handleStateCmt('active')} 
              className={stateCmt=='active'?'dashboard-filter-item active':'dashboard-filter-item'}>
                <Link to='/dashboard/comments/?isDeleted=false' className='filter-item-link'>Đang hoạt động {`(${cmtList.filter(cmt=>cmt.isDeleted==false)?.length})`}</Link>
              </li>
              <li onClick={()=>handleStateCmt('deleted')} 
              className={stateCmt=='deleted'?'dashboard-filter-item active':'dashboard-filter-item'}>
                <Link to='/dashboard/comments/?isDeleted=true' className='filter-item-link'>Đã xóa {`(${cmtList.filter(cmt=>cmt.isDeleted==true)?.length})`}</Link>
              </li>
            </ul>
          )
          }
        </div>

        <div className='data-table'>
        <table className='dashboard-post-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nội dung bình luận</th>
              <th>Người bình luận</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map((cmt, index)=>(
              <tr key={index}>
                <td>{itemOffset+index+1}</td>
                <td>{cmt.content} </td>
                <td>@{accList.find(acc=>acc._id==cmt.idUser)?.username}</td>
                <td>{cmt.isDeleted?
                  <span className='red-asterisk'>Đã xóa</span>
                  :<span className='success-alert'>Đang hoạt động</span>}
                </td>
                <td>{formatTime(cmt.createAt)}</td>
                <td>
                  <a href='' className='detail-item-btn'>
                    Chi tiết
                  </a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        
        </div>
        {currentCmts.length>itemsPerPage &&
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

export default DashboardComment;

const Wrapper = styled.div`
  width: 100%;
  padding: 24px;

  .dashboard-add-new{
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  h3{
    margin: 0;
  }

  .dashboard-new-btn{
    background-color: var(--hightlight-color); 
    padding: 8px;
    border-radius: 8px;
    color: white;
    transition: var(--transition-time);
    box-sizing: border-box;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .dashboard-new-btn:hover{
    background-color: var(--shadow-color); 
  }

  .dashboard-filter{
    background-color: var(--primary-color);
    height: 36px;
    width: 100%;
    box-sizing: border-box;
    margin: 16px 0;
  }

  .dashboard-filter-list{
    height: 100%;
    display: flex;
    justify-content: left;
  }

  .data-table{
    min-height: 580px;
    box-sizing: border-box;
    height: 580px;
  }

  .post-state-filter{
    outline: none;
    padding: 4px 12px;
    
  }

  .dashboard-filter-item{
    border-bottom: 4px solid transparent;
    transition: var(--hightlight-color);
    font-size: 18px;
    cursor: pointer;
    padding: 4px 12px;
  }

  .dashboard-filter-item:hover{
    color: var(--hightlight-color);
  }

  .dashboard-filter-item.active{
    border-bottom: 4px solid var(--hightlight-color);
    color: var(--hightlight-color);

    .filter-item-link{
      color: var(--hightlight-color)
    }
  }

  table, th, td{
    border: 1px solid var(--shadow-color);
    border-collapse: collapse;
    padding: 4px 12px;
    height: 40px;
  }
  table{
    width: 100%;
  }

  th{
    background-color: var(--primary-color);
  }

  tr:nth-child(even){
    background-color: var(--primary-color);
  }

  tr td:first-child{
    text-align: center;
  }

  tr td:nth-child(4){
    font-weight: 700;
  }

  thead th:nth-child(1){
    min-width: 60px;
    box-sizing: border-box;
  }

  thead th:nth-child(2),
  thead th:nth-child(3),
  thead th:nth-child(4),
  thead th:nth-child(5){
    width: 25%;
  }

  thead th:last-child{
    min-width: 84px;
    box-sizing: border-box;
  }

  .detail-item-btn{
    background-color: var(--hightlight-color); 
    padding: 8px;
    border-radius: 8px;
    color: white;
    transition: var(--transition-time);
    display: block;
    width: max-content;
  }

  .detail-item-btn:hover{
    background-color: var(--shadow-color); 
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
`