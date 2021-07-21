import { FC } from 'react';
import styled from 'styled-components';
import MembersByRole, { Member } from './MembersByRole';
import FounderSvg from '../../../assets/imgs/founder.svg';
import FellowSvg from '../../../assets/imgs/fellow.svg';
import AllySvg from '../../../assets/imgs/ally.svg';

export enum MemberRole {
  Founder = 'Founder',
  Fellow = 'Fellow',
  Ally = 'Ally'
}

const RoleMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
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
      <h4>{type}</h4>
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
  > h4 {
    height: 28px;
    font-size: 24px;
    font-weight: 700;
    color: #172026;
    line-height: 28px;
    margin-bottom: 12px;
  }
  > p {
    margin-bottom: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 90px;
    opacity: 0.87;
    color: #172026;
    line-height: 18px;
  }
`;
