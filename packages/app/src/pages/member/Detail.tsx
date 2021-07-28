import React, { FC } from 'react';
import styled from 'styled-components';
import { BorderedRow, PageSkeleton } from '../../components';
import { Style } from '../../shared/style/const';
import { Breadcrumb } from 'antd';
import { MemberRole } from '../../hooks';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { useMember } from '../../hooks';
import { useParams } from 'react-router-dom';
import { DEFAULT_ICON } from '../home/CurrentMembers/MembersByRole';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data: member } = useMember(accountId);

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
            <div className='key member-icon'>
              {member && <img src={member?.account.image || DEFAULT_ICON} alt='' />}
            </div>
            <div className='value member-role'>{member && <img src={badgeImgMap[member.type]} alt='' />}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>AccountID</div>
            <div className='value'>{member?.id || '-'}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Identity</div>
            <div className='value'>{member?.account.display || '-'}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Website</div>
            <div className='value'>
              {!member?.account.web ? '-' : <a href={member.account.web}>{member.account.web}</a>}
            </div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Locked</div>
            <div className='value'>{member?.locked || '-'}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Initiated Date(Ordinary to Founder)</div>
            <div className='value'></div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Applied Date(Ordinary to Candidate)</div>
            <div className='value'></div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Join Date(Candidate to Ally)</div>
            <div className='value'>{member?.joinTime || '-'}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Elevated Date(Ally to Fellow)</div>
            <div className='value'>{member?.elevatedTime || '-'}</div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Status</div>
            <div className='value'>{member?.status || '-'}</div>
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
