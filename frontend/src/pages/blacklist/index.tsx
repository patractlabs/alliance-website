import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BorderedRow, BorderedTitle, Filter, PageSkeleton, Search } from '../../components';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import { Col, Row } from 'antd';
import { Blocked } from './Detail';
import { Style } from '../../shared/style/const';

const Blacklist: FC<{ className?: string }> = ({ className }) => {
  const websites: {
    website: string;
    addedDate: string;
    removedDate: string;
  }[] = [
    {
      website: 'https://www.abcd1.com',
      addedDate: 'Jun-6-2021',
      removedDate: 'Jun-24-2021'
    },
    {
      website: 'https://www.abcasd2.com',
      addedDate: 'Jun-24-2021',
      removedDate: ''
    },
    {
      website: 'https://www.abcad.com',
      addedDate: 'Jun-24-2021',
      removedDate: 'Jun-2-2021'
    },
    {
      website: 'https://www.abcdss.com',
      addedDate: 'Jun-24-2021',
      removedDate: ''
    },
    {
      website: 'https://www.affbc3d.com',
      addedDate: 'Jun-6-2021',
      removedDate: 'Jun-2-2021'
    },
    {
      website: 'https://www.abddcd.com',
      addedDate: 'Jun-24-2021',
      removedDate: ''
    }
    // {
    //   website: 'https://www.abc4ccd.com',
    //   addedDate: 'Jun-6-2021',
    //   removedDate: ''
    // },
    // {
    //   website: 'https://www.abacd.com',
    //   addedDate: 'Jun-24-2021',
    //   removedDate: ''
    // },
    // {
    //   website: 'https://www.abch1d.com',
    //   addedDate: 'Jun-6-2021',
    //   removedDate: ''
    // }
  ];

  const accounts: Blocked[] = [
    {
      address: '1629Shw6asw88GnyXyyUbRtX7YFipQnjScGKcWr1BaRiMhvmAg',
      identity: 'Davaid',
      website: 'www.12345.com',
      locked: '1000 DOT',
      addedDate: 'Jun-6-2021',
      removedDate: 'Jun-24-2021'
    }
    // {
    //   address: '1629Shw6w88GnyXyyUbsdfRtX7YFipQnjScGKcWr1BaRiMhvmAg',
    //   identity: 'Davaid',
    //   website: 'www.12345.com',
    //   locked: '1000 DOT',
    //   addedDate: 'Jun-24-2021',
    //   removedDate: ''
    // },
    // {
    //   address: '1629Shw6w88GnyXyyUbRtX7YzdFipQnjScGKcWr1BaRiMhvmAg',
    //   identity: 'Davaid',
    //   website: 'www.12345.com',
    //   locked: '1000 DOT',
    //   addedDate: 'Jun-2-2021',
    //   removedDate: 'Jun-24-2021'
    // },
    // {
    //   address: '1629Shw6w88GnyXyyUbRvtX7YFipQnjScGKcWr1BaRiMhvmAg',
    //   identity: 'Davaid',
    //   website: 'www.12345.com',
    //   locked: '1000 DOT',
    //   addedDate: 'Jun-24-2021',
    //   removedDate: ''
    // }
  ];

  const [accountType, setAccountType] = useState('All');
  const [websiteType, setWebsiteType] = useState('All');
  const history = useHistory();

  return (
    <PageSkeleton>
      <div className={className}>
        <Search />

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
            <BorderedTitle className='table-title'>
              <div style={{ width: '20%' }}>Address</div>
              <div style={{ width: '30%' }}>Identity</div>
              <div style={{ width: '18%' }}>Added Date</div>
              <div>Removed Date</div>
            </BorderedTitle>
            {accounts
              .filter((account) => {
                if (accountType === 'Added') {
                  return !account.removedDate;
                }

                if (accountType === 'Removed') {
                  return !!account.removedDate;
                }
                return true;
              })
              .map((account, index) => (
                <BorderedRow
                  className='table-row'
                  borderColor={Style.border.negative}
                  style={{ height: '60px', padding: '0px 11px 0px 21px' }}
                  key={index}
                  onClick={() => history.push(`/blacklist/${account.address}`)}
                >
                  <div style={{ width: '20%' }} className='cell'>
                    <span className='alliance-span-link'>{account.address}</span>
                  </div>
                  <div style={{ width: '30%' }} className='cell'>
                    {account.identity}
                  </div>
                  <div style={{ width: '18%' }} className='cell'>
                    {account.addedDate}
                  </div>
                  <div className='cell'>{account.removedDate || '-'}</div>
                  <div className='cell' style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <img src={MorePrimarySvg} alt='' />
                  </div>
                </BorderedRow>
              ))}
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
            <BorderedTitle className='table-title'>
              <div style={{ width: '40%' }}>Website</div>
              <div style={{ width: '30%' }}>Added Date</div>
              <div>Removed Date</div>
            </BorderedTitle>
            {websites
              .filter((website) => {
                if (websiteType === 'Added') {
                  return !website.removedDate;
                }

                if (websiteType === 'Removed') {
                  return !!website.removedDate;
                }
                return true;
              })
              .map((website, index) => (
                <BorderedRow
                  className='table-row'
                  borderColor={Style.border.negative}
                  style={{ height: '60px', padding: '0px 11px 0px 21px' }}
                  key={index}
                  onClick={() => history.push(`/blacklist/${website.website}`)}
                >
                  <div style={{ width: '40%' }} className='cell'>
                    <span className='alliance-span-link'>{website.website}</span>
                  </div>
                  <div style={{ width: '30%' }} className='cell'>
                    {website.addedDate}
                  </div>
                  <div className='cell'>{website.removedDate || '-'}</div>
                  <div className='cell' style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <img src={MorePrimarySvg} alt='' />
                  </div>
                </BorderedRow>
              ))}
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

  > .table-row {
    cursor: pointer;
  }
`;
