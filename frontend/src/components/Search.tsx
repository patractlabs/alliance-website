import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';
import SearchSvg from '../assets/imgs/search.svg';

const Search: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className='input'>
        <img src={SearchSvg} alt='' />
        <input placeholder='AccountID, Identity, Website' />
      </div>
      <button>Search</button>
    </div>
  );
};

export default styled(Search)`
  display: flex;

  > .input {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0px 24px;
    margin-right: 16px;
    height: 56px;
    border: 1px solid ${Style.border.primary};
    border-radius: 28px;
    > img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    > input {
      height: 30px;
      border-width: 0px;
      flex: 1;
      background: rgba(0, 0, 0, 0);
    }
  }

  > button {
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: ${Style.badge.primary};
    line-height: 20px;
    background-color: white;
    width: 135px;
    height: 56px;
    border: 1px solid ${Style.border.primary};
    border-radius: 28px;
  }
`;
