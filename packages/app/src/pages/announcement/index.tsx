import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedTitle, BorderedRow, PageSkeleton, Content } from '../../components';
import { Style } from '../../shared/style/const';
import FoldSvg from '../../assets/imgs/fold-primary.svg';
import ExpandSvg from '../../assets/imgs/expand-primary.svg';
import { useHistory } from 'react-router-dom';
import { useAnnouncements, Announcement, useContent } from '../../hooks';

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

const AnnouncementRow: FC<{ className?: string; annoncement: Announcement; defaultExpanded: boolean }> = ({
  annoncement,
  defaultExpanded
}) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { content } = useContent(annoncement.cid);

  return (
    <Row className='table-row' borderColor={Style.border.negative} padding='13px 12px 13px 21px'>
      <div className='cells' onClick={() => history.push(`/announcement/${annoncement.montionHash}`)}>
        <div className='cell motion-id'>
          <span className='alliance-span-link'>#{annoncement.id}</span>
        </div>
        <div className='cell announcement-date'>{annoncement.createTime}</div>
        <div className='cell announcement-hash'>{annoncement.montionHash}</div>
        <div
          className='cell first-line'
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((old) => !old);
          }}
        >
          <span>{content?.split('\n')[0]}</span>
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
      {expanded && (
        <Content style={{ maxHeight: '280px', padding: '16px', lineHeight: '20px' }} className='content'>
          {content}
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
        <BorderedTitle className='table-title'>
          <div style={{ width: '19.5%' }}>Motion ID</div>
          <div style={{ width: '18.7%' }}>Date</div>
          <div style={{ width: '30.1%' }}>Hash</div>
          <div>First Line</div>
        </BorderedTitle>
        {data?.map((annoncement, index) => (
          <AnnouncementRow key={index} annoncement={annoncement} defaultExpanded={index === 0} />
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
