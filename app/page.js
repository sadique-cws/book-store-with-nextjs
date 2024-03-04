import Image from "next/image";
import Category from "./models/Category";
import ConnectDb from "./db/Connect";
import Link from "next/link";

export default async function Home() {
  ConnectDb();
  let callingCategory = await Category.find();
  return (
      <>
      <div className="flex flex-1 bg-gradient-to-br to-purple-700 from-pink-700 h-[400px] justify-center items-center">
          <div className="w-1/2 flex flex-col gap-2">
              <h1 className="text-white text-2xl font-semibold">Find your Fvt Book</h1>
              <input type="search" className="border px-4 py-3 rounded-md" placeholder="Search by title, author, category etc"/>
              <input type="submit" className="bg-white text-black rounded px-3 py-2 hover:bg-white self-center" value="Search Book"/>
          </div>
      </div>

      <div className="px-[10%] mt-4">
        <div className="flex flex-1 gap-3">
          {callingCategory.map((cat, i) => <Link key={i} href="#" className="bg-white border border-slate-400 px-3 py-1 text-md hover:bg-slate-300 rounded-full">{cat.catTitle}</Link>)}
            
        </div>
      </div>


      </>
  );
}
