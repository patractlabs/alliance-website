import { FC, useState } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';
import SearchSvg from '../assets/imgs/search.svg';

const Search: FC<{ className?: string; onSearch: (value: string) => void }> = ({ className, onSearch }) => {
  const [filter, setFilter] = useState('');

  return (
    <div className={className}>
      <div className='search'>
        <div className='input'>
          <img src={SearchSvg} alt='' />
          <input
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder='AccountID, Identity, Website'
          />
        </div>
        <button onClick={() => onSearch(filter)}>Search</button>
      </div>
    </div>
  );
};

export default styled(Search)`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  > .search {
    flex: 1;
    padding: 0px 58px;
    max-width: 827px;
    min-width: 400px;
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
      &:hover {
        border: 1px solid ${Style.border.primaryActive};
      }
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

      &:hover {
        color: ${Style.border.primaryActive};
        border: 1px solid ${Style.border.primaryActive};
      }
    }
  }
`;
