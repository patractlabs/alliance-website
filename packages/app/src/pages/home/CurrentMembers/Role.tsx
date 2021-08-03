import { FC } from 'react';
import styled from 'styled-components';
import MembersByRole from './MembersByRole';
import FounderSvg from '../../../assets/imgs/founder.svg';
import FellowSvg from '../../../assets/imgs/fellow.svg';
import AllySvg from '../../../assets/imgs/ally.svg';
import { Style } from '../../../shared/style/const';
import { Member, MemberRole } from '../../../hooks';

const RoleMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

const Role: FC<{ className?: string; type: MemberRole; desc: string; members: Member[] }> = ({
  className,
  type,
  desc,
  members
}) => {
  return (
    <div className={className}>
      <img src={RoleMap[type]} alt='' />
      <div className='title'>
        <h4>{type}</h4>
        <span>{members.length}</span>
      </div>
      <p>{desc}</p>
      <MembersByRole members={members} />
    </div>
  );
};

export default styled(Role)`
  text-align: center;

  > img {
    margin-bottom: 12px;
  }
  > .title {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: center;
    > h4 {
      height: 28px;
      font-size: 24px;
      font-weight: 700;
      color: ${Style.label.primary};
      line-height: 28px;
      margin-bottom: 0px;
    }
    > span {
      margin-left: 6px;
      padding: 0px 16px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      background: #e6007a;
      border-radius: 11px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
  }
  > p {
    margin-bottom: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 90px;
    opacity: 0.87;
    color: ${Style.label.primary};
    line-height: 18px;
  }
`;
