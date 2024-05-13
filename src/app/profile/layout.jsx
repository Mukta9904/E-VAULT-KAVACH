import Navbar from "../components/Navbar/page";
import SideNavbar from "../components/SideNavbar/page";

export const metadata = {
  title: "PassManager",
  description: "Save your passwords and data securely",
};

export default function ProfileLayout({ children }) {
   
  return (
    <div className="flex w-full bg-[#EBDFD7] h-[100vh]">
     <SideNavbar/>
      <div className="flex flex-col w-full">
         <Navbar className='w-full' />
       <main className="overflow-auto">{children}</main>
      </div>
    </div>
  );
}
