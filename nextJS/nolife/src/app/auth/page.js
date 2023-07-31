"use client";

import Link from "next/link";
import loginHandler from "@/handler/loginHandler";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function loginComponents() {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    email: email,
    password: password,
  };

  const login = async () => {
    event.preventDefault();
    try {
      const response = await loginHandler(userData);
      const { msg, token, user } = response;
      await Cookies.set("token", token);
      await Cookies.set("userId", user._id);

      setEmail("");
      setPassword("");

      route.push("/landing");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-full w-full font-geologica">
      <form className=" flex flex-col gap-3 bg-slate-100 max-sm:m-5 max-sm:h-[350px] basis-[475px] h-[400px] max-sm:p-5 p-10 shadow-md rounded-lg">
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className=" text-xs italic text-warning"></div>
        <div className=" flex justify-center">
          <button
            onClick={(e) => login(e.preventDefault())}
            className=" bg-white w-16 md:p-2 max-sm:p-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div className=" flex justify-center gap-2 text-sm max-sm:text-xs">
          <p>No account ?</p>
          <Link href="/auth/regist" className=" underline">
            Create Here
          </Link>
        </div>
      </form>
    </div>
  );
}
