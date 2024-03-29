import { Inter } from "next/font/google";
import "./admin.css";
import AdminHeader from "@/app/components/AdminHeader";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel",
  description: "Generated by create next app",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminHeader/>

        <div className="flex px-[10%] mt-5 gap-3">
                <div className="w-1/4">
                    <div className="flex flex-col">
                        <Link href="/admin" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Dashboard</Link>
                        <Link href="/admin/users" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Manage Users</Link>
                        <Link href="/admin/categories" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Manage Categories</Link>
                        <Link href="/admin/books" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Manage Books</Link>
                        <Link href="/admin/orders" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Manage Orders</Link>
                        <Link href="#" className="text-black bg-slate-300 py-3 px-4 hover:bg-red-500 hover:text-white">Logout</Link>
                    </div>
                </div>
                <div className="w-3/4">
                {children}
                <Toaster position="top-right"/>
                </div>

        </div>
        
        
        
        </body>
    </html>
  );
}
