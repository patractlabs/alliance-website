import { CSSProperties, FC } from 'react';
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

const Links: FC<{ className?: string; type: 'home' | '' }> = ({ className, type }) => {
  return (
    <LinksWrapper className={className} type={type}>
      <Link to='/'>Home</Link>
      <Link to='/member'>Members</Link>
      <Link to='/announcement'>Announcements</Link>
      <Link to='/candidate'>Candidates</Link>
      <Link to='/blacklist'>Blacklists</Link>
    </LinksWrapper>
  );
};

const Header: FC<{ className?: string }> = ({ className }) => {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <Logo src={pathname === '/' ? LogoSvg : Logo2Svg} alt='' />
      <Links type={pathname === '/' ? 'home' : ''} />
    </div>
  );
};

export default styled(Header)`
  position: absolute;
  display: flex;
  align-items: center;
  height: 96px;
  justify-content: space-between;
  padding: 0px 58px;
  width: 100%;
  z-index: 100;
`;
