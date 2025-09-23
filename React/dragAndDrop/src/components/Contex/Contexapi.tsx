
import Main from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Contexapi() {
  return (
   <div>
      <Navbar />
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-3">
          <Main />
        </div>
      </div>
    </div>
  );
}






export default Contexapi;
