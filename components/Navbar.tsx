"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.9,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.7,
      },
    },
  };

  return (
    <nav className="flex items-center justify-between relative z-30 py-5 max-container padding-container">
      <Link href="/">
        <Image src="./hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>

      <button onClick={toggleMenu}>
        <Image
          src="menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer lg:hidden"
        />
      </button>
      <AnimatePresence>
        {toggle && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white h-screen w-screen fixed left-0 top-0 text-gray-50 p-10 z-50 origin-top"
          >
            <div className="w-full flexBetween">
              <Link href="/">
                <Image
                  src="./hilink-logo.svg"
                  alt="logo"
                  width={74}
                  height={29}
                />
              </Link>
              <button className="cursor-pointer" onClick={toggleMenu}>
                <Image
                  src="/menuclose.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
              >
                {NAV_LINKS.map((link) => (
                  <div className="overflow-hidden">
                    <motion.div
                      variants={mobileLinkVars}
                      key={link.key}
                      className="regular-32 text-black flexCenter cursor-pointer pb-2.5 transition-all hover:font-bold uppercase"
                    >
                      {link.label}
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
