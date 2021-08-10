import React, { FC } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton, Proposer } from '../../components';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import { useAnnouncement } from '../../hooks';
import Markdown from 'react-markdown';
import { useMotionByIndex } from '../../hooks/useMotionByIndex';
import { useActionByMotionIndex } from '../../hooks/useActionByMotionIndex';
import { formatDate } from '../../core/util/format-date';
import AccountWithExtrinsic from '../../components/AccountWithExtrinsic';

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { data: announcement } = useAnnouncement(announcementId);
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
              render: (
                <div className='announcement-content'>
                  {announcement?.content ? <Markdown>{announcement.content}</Markdown> : '-'}
                </div>
              )
            },
            {
              name: 'Motion Proposer',
              render: <Proposer motion={motion} />
            },
            {
              name: 'Motion Approvers',
              render: (
                <div className='accounts'>
                  {actions.filter((action) => action.approve).length
                    ? actions
                        ?.filter((action) => action.approve)
                        .map((action, index) => (
                          <AccountWithExtrinsic
                            key={index}
                            accountId={action.accountId}
                            block={action.block}
                            extrinsic={action.extrinsic}
                            withBorder={index !== actions.length - 1}
                          />
                        ))
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
                        .map((action, index) => (
                          <AccountWithExtrinsic
                            key={index}
                            accountId={action.accountId}
                            block={action.block}
                            extrinsic={action.extrinsic}
                            withBorder={index !== actions.length - 1}
                          />
                        ))
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
    .announcement-content {
      ul {
        margin: 14px 0px;
        padding-left: 40px;
        li {
          list-style: disc;
        }
      }
      ol {
        margin: 14px 0px;
        padding-left: 40px;
        li {
          list-style: decimal;
        }
      }
    }
    .proposer {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
    }
  }
`;
