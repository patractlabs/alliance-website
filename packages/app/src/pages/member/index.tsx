import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { AccountFormatted, BorderedRow, Filter, PageSkeleton, Search } from '../../components';
import BorderedTitle from '../../components/BorderedTitle';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import FounderSvg from '../../assets/imgs/founder.svg';
import AllySvg from '../../assets/imgs/ally.svg';
import FellowSvg from '../../assets/imgs/fellow.svg';
import { Style } from '../../shared/style/const';
import { useHistory } from 'react-router-dom';
import { useMembers } from '../../hooks/useMembers';
import { MemberRole, MemberStatus } from '../../hooks';
import MemberLogo from '../../components/MemberLogo';
import { formatBalance } from '@polkadot/util';
import { formatDate } from '../../core/util/format-date';
import { config } from '../../core/global';

const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};
export const statusMap = {
  [MemberStatus.EXIST]: 'Existing',
  [MemberStatus.KICKED]: 'Kicked',
  [MemberStatus.RETIRED]: 'Retired'
};
const ALL = 'All';

const typesOptions = [
  { value: ALL, text: ALL },
  { value: MemberRole.FOUNDER, text: 'Founder' },
  { value: MemberRole.FELLOW, text: 'Fellow' },
  { value: MemberRole.ALLY, text: 'Ally' }
];
const statusOptions = [
  { value: ALL, text: ALL },
  { value: MemberStatus.EXIST, text: statusMap[MemberStatus.EXIST] },
  { value: MemberStatus.KICKED, text: statusMap[MemberStatus.KICKED] },
  { value: MemberStatus.RETIRED, text: statusMap[MemberStatus.RETIRED] }
];

const Member: FC<{ className?: string }> = ({ className }) => {
  const { data } = useMembers();
  const [type, setType] = useState(typesOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [filter, setFilter] = useState('');
  const history = useHistory();

  return (
    <PageSkeleton>
      <div className={className}>
        <Search onSearch={setFilter} />

        <div className='filters'>
          <Filter className='filter' span='Types' onChange={setType} options={typesOptions} defaultValue={ALL} />
          <Filter className='filter' span='Status' onChange={setStatus} options={statusOptions} defaultValue={ALL} />
        </div>
        <div className='table'>
          <BorderedTitle>
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
            .filter(
              (member) =>
                !filter ||
                member.account.address.includes(filter) ||
                member.account.display?.includes(filter) ||
                member.account.web?.includes(filter)
            )
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
                  <MemberLogo address={member?.account.address} />
                </div>
                <div className='cell badge'>
                  <img src={badgeImgMap[member.type]} alt='' />
                </div>
                <div className='cell account-id'>
                  <span className='alliance-span-link'>#{member.id}</span>
                </div>
                <div className='cell identity'>
                  <AccountFormatted account={member.account} />
                </div>
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
                <div className='cell locked'>
                  {formatBalance(member.locked || undefined, { forceUnit: 'DOT' }, config.decimal) || '-'}
                </div>
                <div className='cell joined-date'>{formatDate(member.joinTime)}</div>
                <div className='cell elevated-date'>{formatDate(member.elevatedTime)}</div>
                <div className='cell status'>{statusMap[member.status]}</div>
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
      > div {
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
