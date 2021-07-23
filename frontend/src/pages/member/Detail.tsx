import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BorderedRow, PageSkeleton } from '../../components';
import { Member, MemberStatus } from '../home/CurrentMembers/MembersByRole';
import PolkadotSvg from '../../assets/imgs/polkadot.svg';
import { Style } from '../../shared/style/const';
import { Breadcrumb } from 'antd';
import { MemberRole } from '../home/CurrentMembers/Role';
// import { useParams } from 'react-router-dom';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
export const badgeImgMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
};
const Detail: FC<{ className?: string }> = ({ className }) => {
  // const { accountId } = useParams<{ accountId: string }>();
  const [member, setMember] = useState<Member>();

  useEffect(() => {
    setMember({
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      name: 'SubDao',
      accountID: '5H1CKbZYQc4Uk7DAvEwJyXsteGy1jXsYrAEGK16gDLPm4NCt',
      icon: PolkadotSvg,
      role: MemberRole.Founder,
      website: 'https://subdao.io',
      identity: 'xxx',
      initiatedDate: 'Jun-1-2021',
      appliedDate: 'Jun-10-2021',
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021'
    });
  }, []);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/member'>Members</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <div className='info'>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key member-icon'>{member && <img src={member?.icon} alt='' />}</div>
            <div className='value member-role'>{member && <img src={badgeImgMap[member.role]} alt='' />}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>AccountID</div>
            <div className='value'>{member?.accountID}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Identity</div>
            <div className='value'>{member?.identity}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Website</div>
            <div className='value'>
              <a href={member?.website}>{member?.website}</a>
            </div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Locked</div>
            <div className='value'>{member?.locked}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Initiated Date(Ordinary to Founder)</div>
            <div className='value'>{member?.initiatedDate}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Applied Date(Ordinary to Candidate)</div>
            <div className='value'>{member?.appliedDate}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Join Date(Candidate to Ally)</div>
            <div className='value'>{member?.joinedDate}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Elevated Date(Ally to Fellow)</div>
            <div className='value'>{member?.elevatedDate}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Status</div>
            <div className='value'>{member?.stauts}</div>
          </BorderedRow>
        </div>
      </div>
    </PageSkeleton>
  );
};

export default styled(Detail)`
  > .info {
    margin-top: 24px;
    > div {
      > .key {
        width: 30%;
        margin-right: 16px;
        font-weight: 600;
        color: ${Style.label.default};
        line-height: 18px;
      }
      > .value {
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${Style.label.primary};
      }
      > .member-icon > img {
        height: 60px;
        width: 60px;
      }
      > .member-role > img {
        height: 60px;
      }
    }
  }
`;
