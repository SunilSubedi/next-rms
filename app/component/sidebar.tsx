import React from "react";
import Link from "next/link";


export default function SideBar() {

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Orders", href: "/dashboard/orders" },
        { name: "Customers", href: "/dashboard/customers" },
        { name: "Food", href: "/dashboard/food" },
        { name: "Reports", href: "/dashboard/reports" },
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Setting", href: "/dashboard/setting" },
    ];
     
    

    return (
        <aside className="w-60  bg-white border-r p-4 space-y-2">
            <h2 className="font-bold mb-4 text-gray-700">Navigation</h2>
            <nav className="space-y-2">
                { navItems.map((item) => (
                    <Link 
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">{item.name}</Link>    
                    

                ))}






            </nav>

       

        </aside>
    )
}