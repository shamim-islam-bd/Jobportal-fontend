import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1">
        Jobbee - 2021-2022, All Rights Reserved
        <Link
          href="https://storyset.com/people"
          className="ml-4"
          rel="noreferrer"
          target="_blank"
        >
          People illustrations by Storyset
        </Link>
      </p>
    </footer>
  );
};

export default Footer;