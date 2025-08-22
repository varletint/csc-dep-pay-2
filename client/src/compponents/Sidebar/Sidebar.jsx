import { FaHamburger, FaTimes } from "react-icons/fa";
import AccountToggle from "./AccountToggle";
import MadeByV from "./MadeByV";
import RouteSelect from "./RouteSelect";
import SearchInput from "./SearchInput";
import { HiMenu } from "react-icons/hi";
import { useRef, useState } from "react";

export default function Sidebar({}) {
  const sidebarRef = useRef(null);
  const [offNOn, setoffNOn] = useState(false);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("open");
    }
  };

  return (
    <div className='z-10 sm:shadow-md shadow '>
      <div
        className='header w-full min-h-[10vh] sm:hidden bg-gren-500 
      flex items-center px-3'>
        <button
          onClick={() => {
            toggleSidebar();
            setoffNOn(false);
          }}>
          <HiMenu className=' text-[#7a998a]' size={30} />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`
        sidebar shadow 
        
        `}>
        <ul className='mt-[1.6rem] '>
          <span>
            <div className=' text-right mb-10 '>
              <button className='px-5'>
                <FaTimes
                  className=' text-[#7a998a]'
                  size={20}
                  onClick={() => {
                    toggleSidebar();
                  }}
                />
              </button>
            </div>
          </span>
          <div className=''>
            <SearchInput onClick={toggleSidebar} />
            <RouteSelect onClick={toggleSidebar} />
            <div>
              <MadeByV />
            </div>
          </div>
        </ul>
      </div>
      <div
        className=' overflow-y-scroll sticky top-4 
      lg:h-[calc(100vh-32px-49px)] md:h-[calc(100vh-32px-49px)]
      sm:h-[calc(100vh-32px-49px)] hidden sm:block
       border- -z-10 '>
        <AccountToggle />
        <SearchInput />
        <RouteSelect />
      </div>

      <div className=' hidden sm:block'>
        <MadeByV />
      </div>
    </div>
  );
}
