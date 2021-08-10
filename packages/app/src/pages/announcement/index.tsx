import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedTitle, BorderedRow, PageSkeleton, NoData } from '../../components';
import { Style } from '../../shared/style/const';
import FoldSvg from '../../assets/imgs/fold-primary.svg';
import ExpandSvg from '../../assets/imgs/expand-primary.svg';
import { useHistory } from 'react-router-dom';
import { useAnnouncements, Announcement } from '../../hooks';
import Markdown from 'react-markdown';
import { useMotionByIndex } from '../../hooks/useMotionByIndex';
import Content from './Content';
import { formatDate } from '../../core/util/format-date';

const Row = styled(BorderedRow)`
  display: block;
  > .cells {
    display: flex;
  }
  > .content {
    margin-top: 16px;
    min-height: 0px;
  }
`;

const AnnouncementRow: FC<{ className?: string; announcement: Announcement; defaultExpanded: boolean }> = ({
  announcement,
  defaultExpanded
}) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { data: motion } = useMotionByIndex(announcement.motionIndex);

  return (
    <Row className='table-row' borderColor={Style.border.negative} padding='13px 12px 13px 21px'>
      <div className='cells' onClick={() => history.push(`/announcement/${announcement.id}`)}>
        <div className='cell motion-id'>
          <span className='alliance-span-link'>#{announcement.motionIndex}</span>
        </div>
        <div className='cell announcement-date'>{formatDate(announcement.createTime)}</div>
        <div className='cell announcement-hash'>
          <span>{motion?.hash}</span>
        </div>
        <div
          className='cell first-line'
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((old) => !old);
          }}
        >
          <span>{announcement.content || '-'}</span>
        </div>
        <div className='cell more'>
          {announcement.content && (
            <img
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((old) => !old);
              }}
              src={expanded ? FoldSvg : ExpandSvg}
              alt=''
            />
          )}
        </div>
      </div>
      {expanded && announcement.content && (
        <Content>
          <Markdown>{announcement.content}</Markdown>
        </Content>
      )}
    </Row>
  );
};

const Announcements: FC<{ className?: string }> = ({ className }) => {
  const { data } = useAnnouncements();

  return (
    <PageSkeleton>
      <div className={className}>
        <BorderedTitle>
          <div style={{ width: '9%' }}>Motion ID</div>
          <div style={{ width: '14%' }}>Date</div>
          <div style={{ width: '20%' }}>Hash</div>
          <div>First Line</div>
        </BorderedTitle>
        {[...data].reverse().map((annoncement, index) => (
          <AnnouncementRow key={index} announcement={annoncement} defaultExpanded={index === 0} />
        ))}
        {!data.length && <NoData style={{ marginTop: '41px' }} />}
      </div>
    </PageSkeleton>
  );
};

export default styled(Announcements)`
  padding-top: 52px;
  > .table-row > .cells {
    cursor: pointer;
  }
  .motion-id {
    width: 9%;
  }
  .announcement-date {
    width: 14%;
  }
  .announcement-hash {
    width: 20%;
  }
  .first-line {
    user-select: none;
    cursor: pointer;
    flex: 1;
    overflow: hidden;
    > span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .more {
    > img {
      cursor: pointer;
    }
  }
`;
