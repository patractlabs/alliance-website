import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSvg from '../assets/imgs/logo.svg';

const LinksWrapper = styled.div`
  font-size: 15px;
  display: flex;

  > a {
    margin: 0px 20px;
    &:first-child {
      margin-left: 0px;
    }
    &:last-child {
      margin-right: 0px;
    }
    color: #172026;
  }
`;
const Logo = styled.img``;

const Links: FC<{ className?: string }> = ({ className }) => {
  return (
    <LinksWrapper className={className}>
      <Link to='/home'>Home</Link>
      <Link to='/member'>Members</Link>
      <Link to='/announcement'>Announcements</Link>
      <Link to='/candidate'>Candidates</Link>
      <Link to='/blacklist'>Blacklists</Link>
    </LinksWrapper>
  );
};

const Header: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Logo src={LogoSvg} alt='' />
      <Links />
    </div>
  );
};

export default styled(Header)`
  display: flex;
  align-items: center;
  height: 96px;
  justify-content: space-between;
  padding: 0px 58px;
  position: fixed;
  width: 100%;
`;
