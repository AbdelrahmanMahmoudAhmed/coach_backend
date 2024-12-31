


import Header from "@/components/general/PanelHeader";
import Loader from "@/components/general/Loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    // { title: "dashboard", link: "/panel"  , icon:"dashboard"},
    { title: "projects", link: "/panel/projects"  , icon:"projects"},
    { title: "feedbacks", link: "/panel/feedbacks"  , icon:"feedbacks"},
    { title: "services", link: "/panel/services"  , icon:"services"},
    { title: "manage_account", link: "/panel/account"  , icon:"manage_account"},
    { title: "settings", link: "/panel/settings"  , icon:"settings"},
  ];


  return (
    <>
          <Loader />

      <Header links={links}  />

      <main style={{ minHeight: "calc(100vh - 70px)" }} className=" rtl:lg:pr-[100px] ltr:lg:pl-[100px] ">
        <div className=" break-words max-w-full p-4">
        {children}
        </div>
      </main>
    </>
  );
};

export default Layout;

