import { useState } from 'react';

export default function SideBar(props) {
  const [ sideBarOpen, setSideBarOpen ] = useState(false);
  const [ solidUri, setSolidUri ] = useState("https://solid.robbevanherck.be");

  return (
    <div id="sidebar">
      <div
        className={sideBarOpen ? "sidebar open" : "sidebar closed"}
        id="sidebar-content"
      >
        <span className="sidebar-header">Log in to see more!</span>
        <span>
          <label htmlFor="provider-uri">Solid Pod URI</label>
          <input
            id="provider-uri"
            onChange={e => setSolidUri(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                props.login(solidUri);
              }
            }}
            value={solidUri}
          />
          <button
            className="login-button"
            onClick={() => props.login(solidUri)}
          >Log In</button>
        </span>
      </div>
      <a
        id="sidebar-toggle"
        className={sideBarOpen ? "open" : "closed"}
        onClick={() => setSideBarOpen(!sideBarOpen)}
      >
        <i className={
          sideBarOpen ?
            "fas fa-angle-double-left":
            "fas fa-angle-double-right"
        }></i>
      </a>
    </div>
  )
}
