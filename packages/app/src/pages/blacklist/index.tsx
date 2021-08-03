import { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AccountFormatted, BorderedRow, BorderedTitle, Filter, NoData, PageSkeleton, Search } from '../../components';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import { Col, Row } from 'antd';
import { Style } from '../../shared/style/const';
import { useBlacklists } from '../../hooks';
import { formatDate } from '../../core/util/format-date';

const Blacklist: FC<{ className?: string }> = ({ className }) => {
  const { data } = useBlacklists();
  const [accountType, setAccountType] = useState('All');
  const [websiteType, setWebsiteType] = useState('All');
  const history = useHistory();
  const [filter, setFilter] = useState('');

  const websites = useMemo(
    () =>
      data
        .filter((website) => !website.isAccount)
        .filter((website) => !filter || website.website?.includes(filter))
        .filter((website) => {
          if (websiteType === 'Added') {
            return !website.removeTime;
          }

          if (websiteType === 'Removed') {
            return !!website.removeTime;
          }
          return true;
        }),
    [data, filter, websiteType]
  );

  const accounts = useMemo(
    () =>
      data
        .filter((account) => account.isAccount)
        .filter(
          (account) =>
            !filter || account.account?.address.includes(filter) || account.account?.display?.includes(filter)
        )
        .filter((account) => {
          if (accountType === 'Added') {
            return !account.removeTime;
          }

          if (accountType === 'Removed') {
            return !!account.removeTime;
          }

          return true;
        }),
    [data, filter, accountType]
  );

  return (
    <PageSkeleton>
      <div className={className}>
        <Search onSearch={setFilter} />

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '46px' }}>
          <Col span={12}>
            <div className='title'>
              <h3>Accounts</h3>
              <Filter
                onChange={setAccountType}
                span='Types'
                defaultValue='All'
                options={[
                  { text: 'All', value: 'All' },
                  { text: 'Removed', value: 'Removed' },
                  { text: 'Added', value: 'Added' }
                ]}
              />
            </div>
            <BorderedTitle>
              <div style={{ width: '25%' }}>Address</div>
              <div style={{ width: '28%' }}>Identity</div>
              <div style={{ width: '22%' }}>Added Date</div>
              <div style={{ flex: 1 }}>Removed Date</div>
            </BorderedTitle>
            {accounts.map((account, index) => (
              <BorderedRow
                className='table-row'
                borderColor={Style.border.negative}
                style={{ height: '60px', padding: '0px 11px 0px 21px' }}
                key={index}
                onClick={() => history.push(`/blacklist/${account.account?.id}`)}
              >
                <div style={{ width: '25%' }} className='cell'>
                  <span className='alliance-span-link'>{account.account?.address}</span>
                </div>
                <div style={{ width: '28%' }} className='cell'>
                  <AccountFormatted account={account.account} />
                </div>
                <div style={{ width: '22%' }} className='cell'>
                  {formatDate(account.addTime)}
                </div>
                <div className='cell'>{formatDate(account.removeTime)}</div>
                <div className='cell' style={{ justifyContent: 'flex-end', flex: 1 }}>
                  <img src={MorePrimarySvg} alt='' />
                </div>
              </BorderedRow>
            ))}
            {!accounts.length && <NoData style={{ marginTop: '41px' }} />}
          </Col>
          <Col span={12}>
            <div className='title'>
              <h3>Websites</h3>
              <Filter
                onChange={setWebsiteType}
                span='Types'
                defaultValue='All'
                options={[
                  { text: 'All', value: 'All' },
                  { text: 'Removed', value: 'Removed' },
                  { text: 'Added', value: 'Added' }
                ]}
              />
            </div>
            <BorderedTitle>
              <div style={{ width: '40%' }}>Website</div>
              <div style={{ width: '30%' }}>Added Date</div>
              <div>Removed Date</div>
            </BorderedTitle>
            {websites.map((website, index) => (
              <BorderedRow
                className='table-row'
                borderColor={Style.border.negative}
                style={{ height: '60px', padding: '0px 11px 0px 21px' }}
                key={index}
                onClick={() => history.push(`/blacklist/${encodeURIComponent(website.website || '')}`)}
              >
                <div style={{ width: '40%' }} className='cell'>
                  <span className='alliance-span-link'>{website.website}</span>
                </div>
                <div style={{ width: '30%' }} className='cell'>
                  {formatDate(website.addTime)}
                </div>
                <div className='cell'>{formatDate(website.removeTime)}</div>
                <div className='cell' style={{ justifyContent: 'flex-end', flex: 1 }}>
                  <img src={MorePrimarySvg} alt='' />
                </div>
              </BorderedRow>
            ))}
            {!websites.length && <NoData style={{ marginTop: '41px' }} />}
          </Col>
        </Row>
      </div>
    </PageSkeleton>
  );
};

export default styled(Blacklist)`
  padding-top: 22px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 10px;
    > h3 {
      margin-bottom: 0px;
    }
  }

  .table-row {
    cursor: pointer;
  }
`;
