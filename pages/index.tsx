import dynamic from "next/dynamic";
import React from "react";

const Reader: any = dynamic(() => import("../src/components/Reader"), {
    ssr: false,
});

export default () => {
    return <Reader />;
};
