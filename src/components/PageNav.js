import NavBar from "./Navbar";
import Sidebar from "./Sidebar";
import "../style/Page.css";

const PageNav = ({children}) => {
    return (
      <>
        <NavBar />
          <div className="page-container">
            {children}
          </div>
      </>
    );
}

export default PageNav;