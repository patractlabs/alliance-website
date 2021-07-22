import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedRow, Filter, Footer, Search } from '../../components';
import BorderedTitle from '../../components/BorderedTitle';
import { Member as MemberType, MemberStatus } from '../home/CurrentMembers/MembersByRole';
import PolkadotSvg from '../../assets/imgs/polkadot.svg';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import FounderSvg from '../../assets/imgs/founder.svg';
import AllySvg from '../../assets/imgs/ally.svg';
import FellowSvg from '../../assets/imgs/fellow.svg';
import ApronSvg from '../../assets/imgs/apron.png';
import { Style } from '../../shared/style/const';
import { Link } from 'react-router-dom';
import { MemberRole } from '../home/CurrentMembers/Role';

const badgeImgMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
};

const Member: FC<{ className?: string }> = ({ className }) => {
  const members: MemberType[] = [
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      name: 'SubDao',
      accountID: '5H1CKbZYQc4Uk7DAvEwJyXsteGy1jXsYrAEGK16gDLPm4NCt',
      icon: PolkadotSvg,
      role: MemberRole.Founder,
      website: 'https://subdao.io'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      name: 'Phala',
      accountID: '5H768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      icon: ApronSvg,
      role: MemberRole.Ally,
      website: 'https://phala.io'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Kicked,
      locked: '1000 DOT',
      name: 'Cycan',
      accountID: 'sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      icon: PolkadotSvg,
      role: MemberRole.Fellow,
      website: 'https://cycan.network'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      name: 'Zenlink',
      accountID: 'sdfss768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      icon: ApronSvg,
      role: MemberRole.Fellow,
      website: 'https://zenlink.org'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Applied,
      locked: '1000 DOT',
      name: 'OpenSquare',
      accountID: '5sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      icon: PolkadotSvg,
      role: MemberRole.Ally,
      website: 'https://opensquare.network'
    }
  ];
  const typesOptions = [
    { value: 'All', text: 'All' },
    { value: 'Founder', text: 'Founder' },
    { value: 'Ally', text: 'Ally' },
    { value: 'Fellow', text: 'Fellow' }
  ];
  const statusOptions = [
    { value: 'All', text: 'All' },
    { value: 'Existing', text: 'Existing' },
    { value: 'Kicked', text: 'Kicked' },
    { value: 'Applied', text: 'Applied' }
  ];
  const [type, setType] = useState(typesOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);

  return (
    <React.Fragment>
      <div className={className}>
        <div className='bg-linear'>
          <div className='search'>
            <Search />
          </div>
          <div className='filters'>
            <Filter className='filter' span='Types' onChange={setType} options={typesOptions} defaultValue='All' />
            <Filter className='filter' span='Status' onChange={setStatus} options={statusOptions} defaultValue='All' />
          </div>
        </div>
        <div className='table'>
          <BorderedTitle className='table-title'>
            <div style={{ width: '8.4%' }}>Logo</div>
            <div style={{ width: '6.4%' }}>Badge</div>
            <div style={{ width: '12.3%' }}>AccountID</div>
            <div style={{ width: '12.4%' }}>Identity</div>
            <div style={{ width: '17.4%' }}>Website</div>
            <div style={{ width: '9.2%' }}>Locked</div>
            <div style={{ width: '10.2%' }}>Joined Date</div>
            <div style={{ width: '10.6%' }}>Elevated Date</div>
            <div style={{ flex: 1 }}>Status</div>
          </BorderedTitle>
          {members
            .filter(
              (member) => (type === 'All' || member.role === type) && (status === 'All' || member.stauts === status)
            )
            .map((member, index) => (
              <BorderedRow
                className='table-row'
                borderColor={Style.border.negative}
                padding='13px 12px 13px 21px'
                key={index}
              >
                <div className='logo'>
                  <img src={member.icon} alt='' />
                </div>
                <div className='badge'>
                  <img src={badgeImgMap[member.role]} alt='' />
                </div>
                <div className='account-id'>
                  <a href={member.website}>{member.accountID}</a>
                </div>
                <div className='identity'>Identity</div>
                <div className='website'>
                  <a href={member.website}>{member.website}</a>
                </div>
                <div className='locked'>{member.locked}</div>
                <div className='joined-date'>{member.joinedDate}</div>
                <div className='elevated-date'>{member.elevatedDate}</div>
                <div className='status'>{member.stauts}</div>
                <div className='more'>
                  <Link to={`/member/${member.accountID}`}>
                    <img src={MorePrimarySvg} alt='' />
                  </Link>
                </div>
              </BorderedRow>
            ))}
        </div>
      </div>
      <Footer type='default' />
    </React.Fragment>
  );
};

export default styled(Member)`
  flex: 1;

  > .bg-linear {
    background: linear-gradient(180deg, #f5f5f7, #ffffff);
    padding-top: 130px;
    padding-bottom: 20px;

    > .search {
      display: flex;
      justify-content: center;
      margin: 34px auto 38px auto;

      > div {
        flex: 1;
        padding: 0px 58px;
        max-width: 827px;
        min-width: 400px;
      }
    }
    > .filters {
      display: flex;
      padding: 0px 60px;
      margin-bottom: 20px;

      > .filter {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  > .table {
    padding: 0px 60px;

    > .table-title > div {
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px 6px;
    }
    > .table-row {
      &:hover {
        background-color: ${Style.bg.second};
      }
    }
    > .table-row > div {
      font-size: 14px;
      font-weight: 400;
      color: #172026;
      overflow: hidden;
      padding: 0px 6px;

      > a {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .logo {
      width: 8.4%;
      > img {
        width: 32px;
        height: 32px;
      }
    }
    .badge {
      width: 6.4%;
      > img {
        width: 32px;
        height: 32px;
      }
    }
    .account-id {
      width: 12.3%;
    }
    .identity {
      width: 12.4%;
    }
    .website {
      width: 17.4%;
    }
    .locked {
      width: 9.2%;
    }
    .joined-date {
      width: 10.2%;
    }
    .elevated-date {
      width: 10.6%;
    }
    .status {
    }
    .more {
      flex: 1;
      justify-content: flex-end;
    }
  }
`;
