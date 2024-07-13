import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,
  faGithub
 } from '@fortawesome/free-brands-svg-icons';

 import { faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

// function presentYear(){
//   let y=Date().getFullYear();
//   document.querySelector('.year-present').innerHTML=`© ${y} xuanduong01vn`;
// }

// presentYear();

function Footer(){
  return (
    <Wrapper>
      <div className='footer-container'>
        <div className='footer-col'>
          <h1 className='footer-title'>QAx</h1>
          <p className='year-present'>{`© ${new Date().getFullYear()} xuanduong01vn`}</p>
        </div>
        <div className='footer-col'>
          <ul className='footer-list'>
            <li className='footer-item'> <Link target='_blank' href='' className='footer-link'>Chính sách</Link></li>
            <li className='footer-item'><Link target='_blank' href='' className='footer-link'>Quyền lợi</Link></li>
            <li className='footer-item'><Link target='_blank' href='' className='footer-link'>Đóng góp</Link></li>
            <li className='footer-item'><Link target='_blank' href='' className='footer-link'>Trợ giúp</Link></li>
          </ul>
        </div>
        <div className='footer-col'>
        <ul className='footer-list'>
            <li className='footer-item'>
              <Link target='_blank' href='https://www.facebook.com/xuanduong01vn' className='footer-link'>
                <FontAwesomeIcon icon={faFacebook}/>Xuan Duong
              </Link>
            </li>
            <li className='footer-item'>
              <Link target='_blank' href='tel:+84353434036' className='footer-link'>
                <FontAwesomeIcon icon={faPhone} />0353434036
              </Link>
            </li>
            <li className='footer-item'>
              <Link target='_blank' href='mailto:xuanduong01vn@gmail.com' className='footer-link'>
                <FontAwesomeIcon icon={faEnvelope} />xuanduong01vn@gmail.com
              </Link>
            </li>
            <li className='footer-item'>
              <Link target='_blank' href='https://github.com/xuanduong01vn' className='footer-link'>
                <FontAwesomeIcon icon={faGithub} />xuanduong01vn
              </Link>
              </li>
          </ul>
        </div>
        
        
      </div>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  background-color: var(--primary-color);
  padding: 0;
  margin-top: 60px;
  width: 100%;
  bottom: 0;
  color: var(--text-color);
  padding: 40px 0;
  font-weight: 600;

  .footer-container{
    
    width: var(--general-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
  }

  .footer-col{
    width: calc(100%/3);
    text-align: left;
  }

  .footer-title{
    margin: 0;
    color: var(--shadow-color);
    font-weight: 800;
    font-size: 60px;
    text-shadow: 
      -1px -1px 0 var(--text-color),  
      1px -1px 0 var(--text-color),
      -1px 1px 0 var(--text-color),
      1px 1px 0 var(--text-color);
  }

  .footer-list{
    list-style: none;
  }

  .footer-item {
    height: 40px;
    padding: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  

  .footer-link{
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
    transition: var(--transition-time);
    font-size: 16px;

    svg{
      margin-right: 8px;
      height: 18px;

    }

    &:hover{
      color: var(--hightlight-color);
    }
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    .footer-container{
      width: 100%;
      padding: 0 12px;
    }

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    .footer-container{
      width: 100%;
      padding: 0 12px;
    }

    .footer-col{
      width: 50%;
    }

    .footer-col:first-child{
      width: 100%;
    }
  }

  /* small phone */
  @media (max-width: 480px) {
    .footer-container{
      width: 100%;
      padding: 0 12px;
    }

    .footer-col{
      width: 100%;
    }
  }
`