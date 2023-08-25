import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params,

} : {
    children: React.ReactNode;
    params: { storeId: string}
}) {
    const { userId } = auth(); // check if there's a user Id

    if (!userId) { // if no active user redirects to sign in
        redirect('/sign-in');
    }

    // if active user checks if any stores have been created allready
    const store = await prismadb .store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    // if there were no stores redirect to /
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <div><Navbar /></div>
            {children}
        </>
    )
}
