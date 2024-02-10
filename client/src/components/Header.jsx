export const Header = ({text, href, icon}) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={`/${href}`}>
        <i className={`navbar-item-icon far fa-${icon}`}></i>
        <div className="navbar-item-text">{text}</div>
      </a>
    </li>
  )
}