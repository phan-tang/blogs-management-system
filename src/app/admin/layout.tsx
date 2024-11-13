import Link from "next/link";
import { adminNavItems } from "../lib/constants";

import './admin.scss';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="container admin">
            <div className="row admin-nav-items">
                {adminNavItems.map((navItem, namItemIndex) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={`admin-layout-nav-item-${namItemIndex}`}>
                            <div className="admin-layout-nav-item">
                                <Link href={navItem.href} title={navItem.title}>{navItem.title}</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            {children}
        </section>
    );
}