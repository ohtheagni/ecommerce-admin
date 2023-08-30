"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast"

export const ToastProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    // if in server side render return null so there's no hydration error
    if (!isMounted) {
        return null;
    }

    return <Toaster />;
};
