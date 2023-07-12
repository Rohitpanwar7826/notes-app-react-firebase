import { NavLink } from "react-router-dom";
export default function PageNotFound() {
  return (
    <main className="bg-black h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-red-600 text-xl px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <NavLink
          to="/"
          className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-white border border-current">
            <router-link to="/">Go Home</router-link>
          </span>
        </NavLink>
      </button>
    </main>
  );
}
