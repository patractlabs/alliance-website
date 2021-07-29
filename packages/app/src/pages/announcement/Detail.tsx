import React, { FC } from 'react';
import styled from 'styled-components';
import { AccountDisplay, KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { useAnnouncement, useContent } from '../../hooks';
import { decodeCid } from '../../core/util/decode-cid-hex';
import Markdown from 'react-markdown';
import { useMotionByIndex } from '../../hooks/useMotionByIndex';
import { useActionByMotionIndex } from '../../hooks/useActionByMotionIndex';
import { formatDate } from '../../core/util/format-date';

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { data: announcement } = useAnnouncement(announcementId);
  const { content } = useContent(decodeCid(announcement?.cid));
  const { data: motion } = useMotionByIndex(announcement?.motionIndex);
  const { data: actions } = useActionByMotionIndex(announcement?.motionIndex);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/member'>Announcements</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <KeyValuePage
          className='key-values'
          pairs={[
            { name: 'Motion Index', render: <>#{announcement?.motionIndex}</> },
            { name: 'Date', render: <>{formatDate(announcement?.createTime)}</> },
            { name: 'Hash', render: <>{motion?.hash}</> },
            {
              name: 'Content',
              render: <div className='announcement-content'>{content ? <Markdown>{content}</Markdown> : '-'}</div>
            },
            {
              name: 'Motion Proposer',
              render: (
                <>
                  <AccountDisplay id={motion?.proposerId || ''} />
                </>
              )
            },
            {
              name: 'Motion Approvers',
              render: (
                <div className='accounts'>
                  {actions.filter((action) => action.approve).length
                    ? actions
                        ?.filter((action) => action.approve)
                        .map((action) => <AccountDisplay id={action.accountId} key={action.accountId} />)
                    : '-'}
                </div>
              )
            },
            {
              name: 'Motion Disapprovers',
              render: (
                <div className='accounts'>
                  {actions.filter((action) => !action.approve).length
                    ? actions
                        ?.filter((action) => !action.approve)
                        .map((action) => <AccountDisplay id={action.accountId} key={action.accountId} />)
                    : '-'}
                </div>
              )
            }
          ]}
        ></KeyValuePage>
      </div>
    </PageSkeleton>
  );
};

export default styled(Detail)`
  > .key-values {
    margin-top: 40px;
    .accounts {
      display: flex;
      > * {
        margin-right: 24px;
      }
    }
  }
`;
