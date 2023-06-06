import Image from "next/image";
import Link from "next/link";
import React from "react";
const NotFound = () => {
  return (
    <div className="page-not-found-wrapper">
      <Image width={550} height={550} src="/images/404.svg" alt="404_not_found" />

      <h5>
        Page Not Found. Go to <Link href="/">Homepage</Link>{" "}
      </h5>
    </div>
  );
};

export default NotFound;
