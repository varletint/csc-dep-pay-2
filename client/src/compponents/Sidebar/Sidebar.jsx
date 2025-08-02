import AccountToggle from "./AccountToggle";
import MadeByV from "./MadeByV";
import RouteSelect from "./RouteSelect";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  return (
    <div className='z-10 shadow-lg '>
      <div
        className=' overflow-y-scroll sticky top-4 
      lg:h-[calc(100vh-32px-49px)] md:h-[calc(100vh-32px-49px)]
      sm:h-[calc(100vh-32px-49px)]
       border- -z-10 '>
        <AccountToggle />
        <SearchInput />
        <RouteSelect />
      </div>
      <MadeByV />
    </div>
  );
}
