import React, { FC } from 'react';
import styled from 'styled-components';
import { AccountDisplay, Content, KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { useAnnouncement, useContent } from '../../hooks';
import { decodeCid } from '../../core/util/decode-cid-hex';
import Markdown from 'react-markdown';
import { useMotionByIndex } from '../../hooks/useMotionByIndex';
import { useActionByMotionIndex } from '../../hooks/useActionByMotionIndex';

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
            { name: 'Date', render: <>{announcement?.createTime}</> },
            { name: 'Hash', render: <>{motion?.hash}</> },
            {
              name: 'Content',
              render: (
                <div className='announcement-content'>
                  {content && (
                    <Content>
                      <Markdown>{content}</Markdown>
                    </Content>
                  )}
                </div>
              )
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
                <>
                  {actions
                    ?.filter((action) => action.approve)
                    .map((action) => (
                      <AccountDisplay id={action.accountId} key={action.accountId} />
                    ))}
                </>
              )
            },
            {
              name: 'Motion Disapprovers',
              render: (
                <>
                  {' '}
                  {actions
                    ?.filter((action) => !action.approve)
                    .map((action) => action.accountId)
                    .join('-')}
                </>
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
    > .announcement-content {
      line-height: 20px;
      /* word-break: break-all; */
      /* white-space: pre-wrap; */
      white-space: nowrap;
    }
  }
`;
