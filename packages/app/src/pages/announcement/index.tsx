import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedTitle, BorderedRow, PageSkeleton } from '../../components';
import { Style } from '../../shared/style/const';
import FoldSvg from '../../assets/imgs/fold-primary.svg';
import ExpandSvg from '../../assets/imgs/expand-primary.svg';
import { useHistory } from 'react-router-dom';
import { useAnnouncements, Announcement, useContent } from '../../hooks';
import { decodeCid } from '../../core/util/decode-cid-hex';
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
  console.log('annou', decodeCid(announcement.cid));
  const { content } = useContent(decodeCid(announcement.cid));
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
          <span>{content?.split('\n')[0] || '-'}</span>
        </div>
        <div className='cell more'>
          <img
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((old) => !old);
            }}
            src={expanded ? FoldSvg : ExpandSvg}
            alt=''
          />
        </div>
      </div>
      {expanded && content && (
        <Content>
          <Markdown>{content}</Markdown>
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
          <div style={{ width: '19.5%' }}>Motion ID</div>
          <div style={{ width: '18.7%' }}>Date</div>
          <div style={{ width: '30.1%' }}>Hash</div>
          <div>First Line</div>
        </BorderedTitle>
        {[...data].reverse().map((annoncement, index) => (
          <AnnouncementRow key={index} announcement={annoncement} defaultExpanded={index === 0} />
        ))}
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
    width: 19.5%;
  }
  .announcement-date {
    width: 18.7%;
  }
  .announcement-hash {
    width: 30.1%;
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
