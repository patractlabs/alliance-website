import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../../../shared/style/const';
import { Content, Spinner } from '../../../components';
import { useContent } from '../../../hooks/useContent';
import Markdown from 'react-markdown';

const rule = 'QmYzwQ9nvyugGxmqmZbU1oND3AjreXpiMdwJhGisEYSGZr';

const AllianceRule: FC<{ className?: string }> = ({ className }) => {
  const { content, fetching } = useContent(rule);

  console.log('content', content);
  return (
    <div className={className}>
      <h2>Alliance Rule</h2>
      <div className='ipfs-hash'>
        <span>IPFS Hash</span>
        <a href={`https://ipfs.io/ipfs/${rule}`}>{rule}</a>
      </div>
      <div className='content'>
        {!fetching ? (
          <Content className='announcement-content'>
            <Markdown>{content || ''}</Markdown>
          </Content>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default styled(AllianceRule)`
  background-color: white;
  padding: 80px 0px;
  > h2 {
    text-align: center;
  }
  > .ipfs-hash {
    padding: 30px 0px;
    text-align: center;
    > span {
      margin-right: 16px;
      font-size: 20px;
      font-weight: 700;
      color: ${Style.label.primary};
      line-height: 24px;
    }
    > a {
      font-size: 18px;
      line-height: 21px;
    }
  }

  > .content {
    margin: 0px auto;
    max-width: 980px;
    height: 382px;
    display: flex;
    justify-content: center;
    align-items: center;
    > .announcement-content {
      height: 100%;
      overflow-y: auto;
    }
  }
`;
