import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import JumpSvg from '../../../assets/imgs/jump.svg';
import { Member } from '../../../hooks';
import { Style } from '../../../shared/style/const';

export const DEFAULT_ICON = '';

const MembersByRole: FC<{ className?: string; members: Member[] }> = ({ className, members }) => {
  const history = useHistory();

  return (
    <div className={className}>
      {members.map((member, index) => (
        <div className='role' key={index} onClick={() => history.push(`/member/${member.id}`)}>
          <div>
            <img src={member.account.image || DEFAULT_ICON} alt='' />
            <div>
              <h6>{member.account.display}</h6>
              <span>{member.account.web}</span>
            </div>
          </div>
          <img src={JumpSvg} alt='' />
        </div>
      ))}
    </div>
  );
};

export default styled(MembersByRole)`
  cursor: pointer;
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
        overflow: hidden;
        height: 42px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        > h6 {
          text-align: left;
          margin-bottom: 0px;
          height: 20px;
          font-size: 18px;
          color: ${Style.label.primary};
          line-height: 20px;
        }
        > span {
          opacity: 0.56;
          font-size: 12px;
          color: ${Style.label.primary};
          line-height: 14px;
        }
      }
    }
  }
`;
