import { Col, Row } from 'antd';
import { CSSProperties, FC, useState } from 'react';
import styled from 'styled-components';
import ExpandSvg from '../../../assets/imgs/expand.svg';
import DeexpandSvg from '../../../assets/imgs/fold.svg';
import { Style } from '../../../shared/style/const';
import Content from './Content';
import { Announcement, useContent } from '../../../hooks';
import { decodeCid } from '../../../core/util/decode-cid-hex';
import Markdown from 'react-markdown';
import { formatDate } from '../../../core/util/format-date';

const Status = styled.span<{ expanded: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  opacity: 1;
  background: ${(props) => (props.expanded ? Style.badge.primary : Style.badge.negative)};
  border-radius: 50%;
  margin-right: 17px;
`;
const BorderTypeMap = {
  default: `1px solid ${Style.border.default}`,
  primary: ``,
  none: ''
};
const DetailWrapper = styled.div<{ top: BorderType; bottom: BorderType }>`
  cursor: pointer;
  padding: 21px 0px;
  border-top: ${(props) => BorderTypeMap[props.top]};
  border-bottom: ${(props) => BorderTypeMap[props.bottom]};
  font-size: 15px;
  color: #ffffff;
  line-height: 18px;
  > .info {
    img {
      cursor: pointer;
    }
  }
  > .content {
    margin-top: 20px;
    max-height: 384px;
    border: 1px solid #6b7076;
    border-radius: 8px;
    background: ${Style.bg.primary};
    font-size: 14px;
    opacity: 0.87;
    line-height: 18px;
  }
`;

type BorderType = 'primary' | 'default' | 'none';
const AnnouncementDetail: FC<{
  className?: string;
  announcement: Announcement;
  defaultExpanded?: boolean;
  style?: CSSProperties;
  top?: BorderType;
  bottom?: BorderType;
}> = ({ className, announcement, style, defaultExpanded = false, top = 'none', bottom = 'default' }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { content } = useContent(decodeCid(announcement?.cid));

  return (
    <DetailWrapper className={className} style={style} top={top} bottom={bottom}>
      <Row className='info' onClick={() => content && setExpanded((old) => !old)}>
        <Col span={6} style={{ paddingLeft: '16px' }}>
          <Status expanded={expanded && !!content} />
          {formatDate(announcement.createTime)}
        </Col>
        <Col span={17} style={{ display: 'flex', overflow: 'hidden' }}>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{content || '-'}</span>
        </Col>
        <Col span={1} style={{ textAlign: 'right', paddingRight: '11px' }}>
          {content && <img src={expanded ? DeexpandSvg : ExpandSvg} alt='' />}
        </Col>
      </Row>
      {expanded && content && (
        <Content className='content'>
          <Markdown>{content}</Markdown>
        </Content>
      )}
    </DetailWrapper>
  );
};

export default AnnouncementDetail;
