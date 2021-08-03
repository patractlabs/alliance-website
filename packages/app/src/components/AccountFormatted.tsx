import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Account } from '../hooks';
import Known from '../assets/imgs/known.svg';
import KnownChild from '../assets/imgs/known-child.svg';
import Unknown from '../assets/imgs/unknown.svg';
import UnknownChild from '../assets/imgs/unknown-child.svg';
import Bad from '../assets/imgs/bad.svg';
import BadChild from '../assets/imgs/bad-child.svg';
import { Style } from '../shared/style/const';

enum Judge {
  Good,
  Unknown,
  Bad
}

function getIcon(child: boolean, judge: Judge) {
  if (judge === Judge.Good) {
    return child ? KnownChild : Known;
  } else if (judge === Judge.Unknown) {
    return child ? UnknownChild : Unknown;
  }

  return child ? BadChild : Bad;
}

type Judgement = {
  OutofDate?: null;
  Reasonable?: null;
  Unknown?: null;
  KnownGood?: null;
  LowQuality?: null;
  FeePaid?: null;
};

const judgeMap = {
  OutofDate: Judge.Good,
  Reasonable: Judge.Good,
  Unknown: Judge.Unknown,
  KnownGood: Judge.Good,
  LowQuality: Judge.Bad,
  FeePaid: Judge.Good
};

const AccountFormatted: FC<{
  className?: string;
  account?: Account | null;
}> = ({ className, account }) => {
  const judge = useMemo(() => {
    try {
      const _judgement: Judgement = JSON.parse(`${account?.judgements}`);
      return (judgeMap as any)[Object.keys(_judgement)[0] || 'Unknown'];
    } catch (e) {
      return Judge.Unknown;
    }
  }, [account]);

  return (
    <div className={className}>
      {account && <img src={getIcon(!!account?.displayParent, judge)} alt='' />}
      <span className='name'>{account?.displayParent || account?.display || '-'}</span>
      {account?.displayParent && <span className='child'>{account.display}</span>}
    </div>
  );
};

export default styled(AccountFormatted)`
  display: flex;
  align-items: center;

  > img {
    margin-right: 4px;
  }
  > .name {
    font-weight: 500;
    color: ${Style.label.default};
  }
  > .child {
    padding: 0px 2px;
    margin-left: 4px;
    height: 18px;
    background: #efe8ff;
    border-radius: 4px;
    font-size: 12px;
    color: #564877;
  }
`;
