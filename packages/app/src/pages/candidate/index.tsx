import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageSkeleton, BorderedTitle, Search, BorderedRow } from '../../components';
import { Style } from '../../shared/style/const';
import MorePrimarySvg from '../../assets/imgs/more-primary.svg';

export interface CandidateType {
  nominator: string;
  locked: string;
  accountID: string;
  identity: string;
  website: string;
  appliedDate: string;
}

const Candidate: FC<{ className?: string }> = ({ className }) => {
  const candidate: CandidateType[] = [
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYE3RCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYEftk6CuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eddftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYEgtRCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYEftRZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    },
    {
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    }
  ];
  const history = useHistory();

  return (
    <PageSkeleton>
      <div className={className}>
        <Search />
        <BorderedTitle className='table-title'>
          <div style={{ width: '14.7%' }}>AccountID</div>
          <div style={{ width: '18.3%' }}>Identity</div>
          <div style={{ width: '19.1%' }}>Website</div>
          <div style={{ width: '12.7%' }}>Locked</div>
          <div style={{ width: '18.6%' }}>Nominator</div>
          <div>Applied Date</div>
        </BorderedTitle>
        {candidate.map((candidate, index) => (
          <BorderedRow
            className='table-row'
            borderColor={Style.border.negative}
            style={{ height: '60px', padding: '0px 11px 0px 21px' }}
            key={index}
            onClick={() => history.push(`/candidate/${candidate.accountID}`)}
          >
            <div style={{ width: '14.7%' }} className='cell'>
              <span className='alliance-span-link'>{candidate.accountID}</span>
            </div>
            <div style={{ width: '18.3%' }} className='cell'>
              Identity
            </div>
            <div style={{ width: '19.1%' }} className='cell'>
              <a href={candidate.website}>{candidate.website}</a>
            </div>
            <div style={{ width: '12.7%' }} className='cell'>
              {candidate.locked}
            </div>
            <div style={{ width: '18.6%' }} className='cell'>
              {candidate.nominator}
            </div>
            <div className='cell'>{candidate.appliedDate}</div>
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
