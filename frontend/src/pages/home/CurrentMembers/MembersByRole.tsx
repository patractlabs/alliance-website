import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import JumpSvg from '../../../assets/imgs/jump.svg';

export interface Member {
  icon: string;
  accountID: string;
  name: string;
  website: string;
}

const MembersByRole: FC<{ className?: string; members: Member[] }> = ({ className, members }) => {
  return (
    <div className={className}>
      {members.map((member, index) => (
        <div className='role' key={index}>
          <div>
            <img src={member.icon} alt='' />
            <div>
              <h6>{member.name}</h6>
              <span>{member.website}</span>
            </div>
          </div>
          <Link to={`/member/${member.accountID}`}>
            <img src={JumpSvg} alt='' />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default styled(MembersByRole)`
  border-radius: 8px;
  box-shadow: 0px 4px 48px 0px rgba(23, 32, 38, 0.08);
  > .role {
    height: 84px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(202, 191, 196, 0.24);

    > div {
      display: flex;
      align-items: center;
      > img {
        margin-right: 16px;
        width: 56px;
        height: 56px;
      }
      > div {
        > h6 {
          text-align: left;
          margin-bottom: 0px;
          height: 20px;
          font-size: 18px;
          color: #172026;
          line-height: 20px;
        }
        > span {
          opacity: 0.56;
          font-size: 12px;
          color: #172026;
          line-height: 14px;
        }
      }
    }
  }
`;
