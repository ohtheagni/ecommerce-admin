import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth() // checks for the currently active user

    if(!userId) { // if there is an active user you won't redirect to sign in
        redirect('/sign-in')
    }

    // loads the first store available with currently logged in user
    // this checks if logged in user has any stores created
    const store = await prismadb.store.findFirst({
        where: {
            userId // currently logged in user
        }
    });

    // if store exists redirect to /store.id which is [storeId] folder in (dashboard)
    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
        {children}
        </>
    )
}
