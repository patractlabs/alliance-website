import React, { FC } from 'react';
import styled from 'styled-components';
import { BorderedRow, MotionHistory, KeyValuePage, PageSkeleton, AccountFormatted } from '../../components';
import { Breadcrumb } from 'antd';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { MemberRole, useBlacklist, useCandidate, useMember } from '../../hooks';
import { useParams } from 'react-router-dom';
import { Style } from '../../shared/style/const';
import { formatDate } from '../../core/util/format-date';
import { formatLocked } from '../../core/util/format-locked';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

export interface Blocked {
  address: string;
  identity: string;
  website: string;
  locked: string;
  addedDate: string;
  removedDate: string;
}

const Detail: FC<{ className?: string }> = ({ className }) => {
  let { address } = useParams<{ address: string }>();
  address = decodeURIComponent(address);
  const { data: blocked } = useBlacklist(address);
  const { data: candidate } = useCandidate(address);
  const { data: member } = useMember(address);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/blacklist'>Blacklist</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <KeyValuePage
          className='key-values'
          pairs={
            [
              blocked?.isAccount && { name: 'Address', render: <>{blocked?.account?.address}</> },
              blocked?.isAccount && {
                name: 'Identity',
                render: (
                  <>
                    <AccountFormatted account={blocked.account} />
                  </>
                )
              },
              !blocked?.isAccount && {
                name: 'Website',
                render: !blocked?.website ? <>-</> : <a href={blocked.website}>{blocked.id}</a>
              },
              blocked?.isAccount && {
                name: 'Website',
                render: !blocked?.account?.web ? (
                  <>-</>
                ) : (
                  <a target='_blank' rel='noreferrer' href={blocked.account.web}>
                    {blocked.account.web}
                  </a>
                )
              },
              blocked?.isAccount && {
                name: 'Locked',
                render: <>{formatLocked(candidate?.locked || member?.locked)}</>
              }
            ].filter(Boolean) as any
          }
        ></KeyValuePage>
        <KeyValuePage
          className='key-values key-values-no-margin-top'
          pairs={[
            { name: 'Added Date', render: <>{formatDate(blocked?.addTime)}</>, withoutTop: true, withoutBottom: true }
          ]}
        ></KeyValuePage>
        <BorderedRow borderColor={Style.border.lighter} padding='0px'>
          <MotionHistory motionIndex={blocked?.addMotionIndex} />
        </BorderedRow>
        <KeyValuePage
          className='key-values key-values-no-margin-top'
          pairs={[
            {
              name: 'Removed Date',
              render: <>{formatDate(blocked?.removeTime)}</>,
              withoutTop: true,
              withoutBottom: true
            }
          ]}
        ></KeyValuePage>
        <BorderedRow borderColor={Style.border.lighter} padding='0px'>
          <MotionHistory motionIndex={blocked?.removeMotionIndex} />
        </BorderedRow>
      </div>
    </PageSkeleton>
  );
};

export default styled(Detail)`
  > .key-values {
    margin-top: 40px;
  }
  > .key-values-no-margin-top {
    margin-top: 0px;
  }
`;
