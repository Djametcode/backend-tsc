"use client";

import HeaderComponents from "@/components/header";
import NavMobileFix from "@/components/navbarMobile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingLayout = ({ children }) => {
  const token = Cookies.get("token");
  const route = useRouter();

  useEffect(() => {
    if (!token) {
      route.push("/auth");
    }
  }, [token]);

  return (
    <div className=" h-screen w-screen md:hidden">
      <div className=" fixed top-0 w-full z-30">
        <HeaderComponents />
      </div>
      <div className=" fixed bottom-0 w-full z-30">
        <NavMobileFix />
      </div>
      {children}
    </div>
  );
};

export default LandingLayout;