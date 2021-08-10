import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Style } from '../../../shared/style/const';
import { Content, Spinner } from '../../../components';
import { useContent } from '../../../hooks/useContent';
import Markdown from 'react-markdown';
import { useRule } from '../../../hooks';

const draftCid = 'QmZawuqmeEXBN8dcRNkabocLqVGAkD7ppMb9Hse2KP2SNU';

const AllianceRule: FC<{ className?: string }> = ({ className }) => {
  const { data } = useRule();
  const cid = useMemo(() => (data?.cid ? data.cid : draftCid), [data]);
  const { content, fetching } = useContent(cid);

  return (
    <div className={className}>
      <h2>
        Alliance Rule
        {!data?.cid && <span>Draft</span>}
      </h2>
      <div className='ipfs-hash'>
        <span>IPFS Hash</span>
        <a target='_blank' rel='noreferrer' href={`https://ipfs.io/ipfs/${cid}`}>
          {cid}
        </a>
      </div>
      <div className='content'>
        {!fetching ? (
          content && (
            <Content>
              <Markdown>{content || ''}</Markdown>
            </Content>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default styled(AllianceRule)`
  background-color: white;
  padding: 80px 55px;

  > h2 {
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      position: relative;
      top: 25%;
      margin-left: 15px;
      padding: 0px 16px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      background: #e6007a;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
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
    max-width: 1160px;
    height: 574px;
    display: flex;
    justify-content: center;
    align-items: center;

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
`;
