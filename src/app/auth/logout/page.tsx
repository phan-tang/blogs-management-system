'use client'

import { useRouter } from "next/navigation";

import CustomForm from "@/app/components/customForm/customForm";
import { logoutFields } from "@/app/lib/constants";
import { toastSuccess } from "@/app/lib/toastify";

export default function Logout() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        toastSuccess("Logout successfully");
        router.push('/');
    }

    return (
        <section className="page">
            <div className="page-content">
                <CustomForm formItem={logoutFields} handleSubmitForm={handleLogout} />
            </div>
        </section>
    );
}