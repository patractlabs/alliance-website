import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoSvg from '../assets/imgs/logo.svg';
import Logo2Svg from '../assets/imgs/logo-black.svg';
import { Style } from '../shared/style/const';

const LinksWrapper = styled.div<{ type: 'home' | '' }>`
  font-size: 15px;
  display: flex;

  > a {
    font-size: 15px;
    font-weight: 300;
    color: ${(props) => (props.type === 'home' ? '#ffffff' : Style.label.primary)};
    margin: 0px 20px;
    &:first-child {
      margin-left: 0px;
    }
    &:last-child {
      margin-right: 0px;
    }
  }
`;
const Logo = styled.img``;

const Links: FC<{ className?: string }> = ({ className }) => {
  const { pathname } = useLocation();

  return (
    <LinksWrapper className={className} type={pathname === '/' ? 'home' : ''}>
      <Link to='/' style={{ color: pathname === '/' ? Style.badge.primary : '' }}>
        Home
      </Link>
      <Link to='/member' style={{ color: pathname.startsWith('/member') ? Style.badge.primary : '' }}>
        Members
      </Link>
      <Link to='/announcement' style={{ color: pathname.startsWith('/announcement') ? Style.badge.primary : '' }}>
        Announcements
      </Link>
      <Link to='/candidate' style={{ color: pathname.startsWith('/candidate') ? Style.badge.primary : '' }}>
        Candidates
      </Link>
      <Link to='/blacklist' style={{ color: pathname.startsWith('/blacklist') ? Style.badge.primary : '' }}>
        Blacklists
      </Link>
    </LinksWrapper>
  );
};

const Header: FC<{ className?: string }> = ({ className }) => {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <div>
        <Link to='/'>
          <Logo src={pathname === '/' ? LogoSvg : Logo2Svg} alt='' />
        </Link>
        <Links />
      </div>
    </div>
  );
};

export default styled(Header)`
  position: absolute;
  height: 96px;
  padding: 0px 58px;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    max-width: 1170px;
  }
`;
