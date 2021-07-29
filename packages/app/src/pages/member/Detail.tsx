import React, { FC } from 'react';
import styled from 'styled-components';
import { BorderedRow, MotionHistory, PageSkeleton } from '../../components';
import { Style } from '../../shared/style/const';
import { Breadcrumb } from 'antd';
import { MemberRole, useCandidate } from '../../hooks';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { useMember } from '../../hooks';
import { useParams } from 'react-router-dom';
import { formatBalance } from '@polkadot/util';
import MemberLogo from '../../components/MemberLogo';
import { formatDate } from '../../core/util/format-date';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data: member } = useMember(accountId);
  const { data: candidate } = useCandidate(accountId);

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
              <MemberLogo address={member?.account.address} />
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
              {!member?.account.web ? (
                '-'
              ) : (
                <a target='_blank' rel='noreferrer' href={member.account.web}>
                  {member.account.web}
                </a>
              )}
            </div>
          </BorderedRow>
          <BorderedRow borderColor={Style.border.lighter} padding='16px'>
            <div className='key'>Locked</div>
            <div className='value'>{formatBalance(member?.locked || undefined, {}, 10) || '-'}</div>
          </BorderedRow>
          {member?.type === MemberRole.FOUNDER && (
            <BorderedRow borderColor={Style.border.lighter} padding='16px'>
              <div className='key'>Initiated Date(Ordinary to Founder)</div>
              <div className='value'>{formatDate(member.joinTime)}</div>
            </BorderedRow>
          )}
          {member?.type !== MemberRole.FOUNDER && (
            <React.Fragment>
              <BorderedRow borderColor={Style.border.lighter} padding='16px'>
                <div className='key'>Applied Date(Ordinary to Candidate)</div>
                <div className='value'>{formatDate(candidate?.applyTime)}</div>
              </BorderedRow>
              <BorderedRow widthoutBottom={true} borderColor={Style.border.lighter} padding='16px'>
                <div className='key'>Join Date(Candidate to Ally)</div>
                <div className='value'>{formatDate(member?.joinTime)}</div>
              </BorderedRow>
              <BorderedRow borderColor={Style.border.lighter} padding='0px'>
                <MotionHistory motionIndex={member?.joinMotionIndex || undefined} />
              </BorderedRow>
              <BorderedRow widthoutBottom={true} borderColor={Style.border.lighter} padding='16px'>
                <div className='key'>Elevated Date(Ally to Fellow)</div>
                <div className='value'>{formatDate(member?.elevatedTime)}</div>
              </BorderedRow>
              <BorderedRow borderColor={Style.border.lighter} padding='0px'>
                <MotionHistory motionIndex={member?.elevatedMotionIndex || undefined} />
              </BorderedRow>
            </React.Fragment>
          )}
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
        font-weight: 600;
        color: ${Style.label.default};
        line-height: 18px;
      }
      > .value {
        padding-left: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${Style.label.primary};
      }
      > .member-icon > div {
        height: 60px;
        width: 60px;
      }
      > .member-role > img {
        height: 60px;
      }
    }
  }
`;
