import SideBar from "./sidebar/SideBar";
import TopBar from "./sidebar/TopBar";
import "./root.css";

function RootLayout({ children, title }) {
  return (
    <div className="relative flex">
      <TopBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="rootLayout">
          {/* ax-w-full flex-1 mt-[7rem] ml-[300px] */}
          
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
