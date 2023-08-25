"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    // if in server side render return null so there's no hydration error
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};
