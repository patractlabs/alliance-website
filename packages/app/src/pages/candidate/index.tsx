import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageSkeleton, BorderedTitle, Search, BorderedRow } from '../../components';
import { Style } from '../../shared/style/const';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';
import { useCandidates } from '../../hooks';
import { formatBalance } from '@polkadot/util';
import { formatDate } from '../../core/util/format-date';

export interface CandidateType {
  nominator: string;
  locked: string;
  accountID: string;
  identity: string;
  website: string;
  appliedDate: string;
}

const Candidate: FC<{ className?: string }> = ({ className }) => {
  const { data } = useCandidates();
  const history = useHistory();
  const [filter, setFilter] = useState('');

  return (
    <PageSkeleton>
      <div className={className}>
        <Search onSearch={setFilter} />

        <BorderedTitle className='table-title'>
          <div style={{ width: '14.7%' }}>AccountID</div>
          <div style={{ width: '18.3%' }}>Identity</div>
          <div style={{ width: '19.1%' }}>Website</div>
          <div style={{ width: '12.7%' }}>Locked</div>
          <div style={{ width: '18.6%' }}>Nominator</div>
          <div>Applied Date</div>
        </BorderedTitle>
        {data
          .filter(
            (member) =>
              !filter ||
              member.account.address.includes(filter) ||
              member.account.display?.includes(filter) ||
              member.account.web?.includes(filter)
          )
          .map((candidate, index) => (
            <BorderedRow
              className='table-row'
              borderColor={Style.border.negative}
              style={{ height: '60px', padding: '0px 11px 0px 21px' }}
              key={index}
              onClick={() => history.push(`/candidate/${candidate.id}`)}
            >
              <div style={{ width: '14.7%' }} className='cell'>
                <span className='alliance-span-link'>{candidate.account.address}</span>
              </div>
              <div style={{ width: '18.3%' }} className='cell'>
                {candidate.account.display}
              </div>
              <div style={{ width: '19.1%' }} className='cell'>
                <a href={candidate.account.web || ''}>{candidate.account.web}</a>
              </div>
              <div style={{ width: '12.7%' }} className='cell'>
                {formatBalance(candidate?.locked || undefined, {}, 10) || '-'}
              </div>
              <div style={{ width: '18.6%' }} className='cell'>
                {candidate.nominator?.display || '-'}
              </div>
              <div className='cell'>{formatDate(candidate.applyTime)}</div>
              <div className='cell' style={{ justifyContent: 'flex-end', flex: 1 }}>
                <img src={MorePrimarySvg} alt='' />
              </div>
            </BorderedRow>
          ))}
      </div>
    </PageSkeleton>
  );
};

export default styled(Candidate)`
  padding-top: 22px;

  > .table-title {
    margin-top: 60px;
  }

  > .table-row {
    cursor: pointer;
  }
`;
