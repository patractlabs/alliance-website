import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedRow, Filter, PageSkeleton, Search } from '../../components';
import BorderedTitle from '../../components/BorderedTitle';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import FounderSvg from '../../assets/imgs/founder.svg';
import AllySvg from '../../assets/imgs/ally.svg';
import FellowSvg from '../../assets/imgs/fellow.svg';
import { Style } from '../../shared/style/const';
import { useHistory } from 'react-router-dom';
import { useMembers } from '../../hooks/useMembers';
import { MemberRole, MemberStatus } from '../../hooks';
import { DEFAULT_ICON } from '../home/CurrentMembers/MembersByRole';

const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};
const ALL = 'ALL';
const Member: FC<{ className?: string }> = ({ className }) => {
  const { data } = useMembers();

  // const members: MemberType[] = [
  //   {
  //     joinedDate: 'Jun-1-2021',
  //     elevatedDate: 'Jun-24-2021',
  //     stauts: MemberStatus.Existing,
  //     locked: '1000 DOT',
  //     name: 'SubDao',
  //     accountID: '5H1CKbZYQc4Uk7DAvEwJyXsteGy1jXsYrAEGK16gDLPm4NCt',
  //     icon: PolkadotSvg,
  //     role: MemberRole.Founder,
  //     identity: 'xxx',
  //     initiatedDate: 'Jun-1-2021',
  //     appliedDate: 'Jun-10-2021',
  //     website: 'https://subdao.io'
  //   },
  //   {
  //     joinedDate: 'Jun-1-2021',
  //     elevatedDate: 'Jun-24-2021',
  //     stauts: MemberStatus.Existing,
  //     locked: '1000 DOT',
  //     name: 'Phala',
  //     accountID: '5H768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
  //     icon: ApronSvg,
  //     role: MemberRole.Ally,
  //     initiatedDate: 'Jun-1-2021',
  //     appliedDate: 'Jun-10-2021',
  //     identity: 'xxx',
  //     website: 'https://phala.io'
  //   },
  //   {
  //     joinedDate: 'Jun-1-2021',
  //     elevatedDate: 'Jun-24-2021',
  //     stauts: MemberStatus.Kicked,
  //     locked: '1000 DOT',
  //     name: 'Cycan',
  //     accountID: 'sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
  //     icon: PolkadotSvg,
  //     role: MemberRole.Fellow,
  //     identity: 'xxx',
  //     website: 'https://cycan.network',
  //     initiatedDate: 'Jun-1-2021',
  //     appliedDate: 'Jun-10-2021'
  //   },
  //   {
  //     joinedDate: 'Jun-1-2021',
  //     elevatedDate: 'Jun-24-2021',
  //     stauts: MemberStatus.Existing,
  //     locked: '1000 DOT',
  //     name: 'Zenlink',
  //     accountID: 'sdfss768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
  //     icon: ApronSvg,
  //     role: MemberRole.Fellow,
  //     identity: 'xxx',
  //     initiatedDate: 'Jun-1-2021',
  //     appliedDate: 'Jun-10-2021',
  //     website: 'https://zenlink.org'
  //   },
  //   {
  //     stauts: MemberStatus.Applied,
  //     locked: '1000 DOT',
  //     name: 'OpenSquare',
  //     accountID: '5sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
  //     icon: PolkadotSvg,
  //     role: MemberRole.Ally,
  //     identity: 'xxx',
  //     initiatedDate: 'Jun-1-2021',
  //     appliedDate: 'Jun-10-2021',
  //     joinedDate: 'Jun-1-2021',
  //     elevatedDate: 'Jun-24-2021',
  //     website: 'https://opensquare.network'
  //   }
  // ];

  const typesOptions = [
    { value: ALL, text: ALL },
    { value: MemberRole.FOUNDER, text: MemberRole.FOUNDER },
    { value: MemberRole.FELLOW, text: MemberRole.FELLOW },
    { value: MemberRole.ALLY, text: MemberRole.ALLY }
  ];
  const statusOptions = [
    { value: ALL, text: ALL },
    { value: MemberStatus.EXIST, text: MemberStatus.EXIST },
    { value: MemberStatus.KICKED, text: MemberStatus.KICKED },
    { value: MemberStatus.RETIRED, text: MemberStatus.RETIRED }
  ];
  const [type, setType] = useState(typesOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);
  const history = useHistory();

  return (
    <PageSkeleton>
      <div className={className}>
        <Search />
        <div className='filters'>
          <Filter className='filter' span='Types' onChange={setType} options={typesOptions} defaultValue={ALL} />
          <Filter className='filter' span='Status' onChange={setStatus} options={statusOptions} defaultValue={ALL} />
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
          {data
            .filter((member) => (type === ALL || member.type === type) && (status === ALL || member.status === status))
            .map((member, index) => (
              <BorderedRow
                className='table-row'
                borderColor={Style.border.negative}
                padding='13px 12px 13px 21px'
                key={index}
                onClick={() => history.push(`/member/${member.id}`)}
              >
                <div className='cell logo'>
                  <img src={member.account.image || DEFAULT_ICON} alt='' />
                </div>
                <div className='cell badge'>
                  <img src={badgeImgMap[member.type]} alt='' />
                </div>
                <div className='cell account-id'>
                  <span className='alliance-span-link'>#{member.id}</span>
                </div>
                <div className='cell identity'>{member.account.display}</div>
                <div className='cell website'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={member.account.web || ''}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.account.web}
                  </a>
                </div>
                <div className='cell locked'>{member.locked || '-'}</div>
                <div className='cell joined-date'>{member.joinTime}</div>
                <div className='cell elevated-date'>{member.elevatedTime || '-'}</div>
                <div className='cell status'>{member.status}</div>
                <div className='cell more'>
                  <img src={MorePrimarySvg} alt='' />
                </div>
              </BorderedRow>
            ))}
        </div>
      </div>
    </PageSkeleton>
  );
};

export default styled(Member)`
  padding-top: 22px;
  > .filters {
    display: flex;
    padding: 0px 15px;
    margin-bottom: 20px;
    margin-top: 38px;

    > .filter {
      &:first-child {
        margin-right: 20px;
      }
    }
  }
  > .table {
    > .table-row > div {
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      color: #172026;
      overflow: hidden;

      > a {
        white-space: nowrap;
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
