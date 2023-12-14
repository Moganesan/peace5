import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  HomeIcon,
  KeyIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ChevronDoubleLeftIcon,
  WifiIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
const menuItems: any = [
  {
    id: 1,
    label: "Home",
    link: "/",
  },
  { id: 2, label: "Passwords", icon: KeyIcon, link: "/passwords" },
  {
    id: 3,
    label: "Payment Cards",
    link: "/cards",
  },
  {
    id: 4,
    label: "Bank Accounts",
    link: "/banks",
  },
  {
    id: 5,
    label: "Documents",
    link: "/documents",
  },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu: any = useMemo(
    () => menuItems.find((menu: any) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 z-20 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <div className="flex items-center">
              <div>
                <h1>Peace5</h1>
              </div>
            </div>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronDoubleLeftIcon className="text-text w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(
            (menu: { link: string; icon: React.ReactNode; label: string }) => {
              const classes = getNavItemClasses(menu);
              return (
                <div className={classes}>
                  <Link
                    href={menu.link}
                    className="flex py-4 px-3 items-center w-full h-full"
                  >
                    <div style={{ width: "2.5rem" }}>
                      {menu.label == "Home" ? (
                        <HomeIcon className="text-text-light w-6 h-6" />
                      ) : menu.label == "Payment Cards" ? (
                        <CreditCardIcon className="text-text-light w-6 h-6" />
                      ) : menu.label == "Bank Accounts" ? (
                        <BuildingLibraryIcon className="text-text-light w-6 h-6" />
                      ) : menu.label == "Wify Passwords" ? (
                        <WifiIcon className="text-text-light w-6 h-6" />
                      ) : (
                        <ClipboardDocumentCheckIcon className="text-text-light w-6 h-6" />
                      )}
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <ArrowRightOnRectangleIcon className="text-text-light w-5 h-5" />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
