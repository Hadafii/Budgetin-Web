import NavBar from "./Navbar";
import Sidebar from "./Sidebar";
import "../style/Page.css";

const Page = ({children, collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas}) => {
    return (
      <>
        <NavBar toggleSidebar={toggleSidebar} handleShowOffcanvas={handleShowOffcanvas} />
        <div className="d-flex flex-row">
        <Sidebar isCollapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />
        <div className={`flex-grow-1 page-content ${collapsed ? 'collapsed' : ''}`}>
         
          <div className="page-container">
            {children}
          </div>
        </div>
      </div>
      </>
    );
}

export default Page;