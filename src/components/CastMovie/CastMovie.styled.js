import styled from 'styled-components';

export const CastList = styled.ul`
display: flex;
    flex-wrap: wrap;
    gap: 30px;
    text-align: center;
    justify-content: center;
`;

export const CastItem = styled.li`
  flex-basis: calc((100% - 60px) / 6);
  width: 129px;
  height: 246px;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
`;

export const WrapperContent = styled.div`
  padding: 8px 10px;
`;

export const ImgCast = styled.img`
  margin: 0 auto;
background-size: cover;
background-position: center;
`;