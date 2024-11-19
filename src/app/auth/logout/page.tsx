'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomForm from "@/app/components/customForm/customForm";
import { logoutFields } from "@/app/lib/constants";
import { toastSuccess } from "@/app/lib/toastify";
import Loading from "@/app/loading";

export default function Logout() {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        toastSuccess("Logout successfully");
        router.push('/');
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (!user) {
            router.push('/');
        }
        setLoading(false)
    }, [])

    return (
        <section className="page">
            {loading && <Loading />}
            {!loading && <div className="page-content">
                <CustomForm formItem={logoutFields} handleSubmitForm={handleLogout} />
            </div>}
        </section>
    );
}