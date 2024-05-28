import styled from 'styled-components';
import BlogList from '../BlogList/BlogList.js';
import QuestionList from '../QuestionList/QuestionList.js';

function HomeLayout(){
  return (
    <Wrapper>
      <div className="home-content">
        <BlogList/>
        <QuestionList/>
      </div>
    </Wrapper>
  )
}

export default HomeLayout;

const Wrapper = styled.div`
  width: 100vw;
  margin: 0;
  margin-top: 80px;
  box-sizing: content-box;
  display: flex;
  justify-content: center;

  .home-content{
    width: var(--general-width);
    display: flex;
    justify-content: space-between;
  }
`