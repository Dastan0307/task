"use client";

import React from "react";
import Logo from "@assets/icons/HeaderLogo.svg";
import { useState, useEffect } from "react";
import classes from "./headerComponent.module.scss";
import Image from "next/image";
import { navItems } from "@utils/constants";
import HeaderNav from "../headerNav/headerNav";
import Link from "next/link";
import { Typography } from "@typography/typography";
import { Modal } from "src/ui/modal/modal";
import Form from "@modules/sendForm/form";
import {
  getHeaderAreas,
  getHeaderBrands,
  getHeaderInstallation,
  getHeaderRepair,
} from "@modules/aboutBlock/model/aboutBlockModel";

interface Slug {
  name: string;
  slug: string;
}

interface Data {
  brands: Slug[];
  installs: Slug[];
  repair: Slug[];
  areas: Slug[];
}

const HeaderComponent = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<Data>({
    brands: [],
    installs: [],
    repair: [],
    areas: [],
  });

  useEffect(() => {
    const fetchHeaderData = async () => {
      const newData: Data = { brands: [], installs: [], repair: [], areas: [] };

      try {
        const brands = await getHeaderBrands();
        newData.brands = brands || [];
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }

      try {
        const installs = await getHeaderInstallation();
        newData.installs = installs || [];
      } catch (error) {
        console.error("Failed to fetch installations:", error);
      }

      try {
        const repair = await getHeaderRepair();
        newData.repair = repair || [];
      } catch (error) {
        console.error("Failed to fetch repairs:", error);
      }

      try {
        const areas = await getHeaderAreas();
        newData.areas = areas || [];
      } catch (error) {
        console.error("Failed to fetch areas:", error);
      }

      setData(newData);
    };

    fetchHeaderData();
    return () => {
      setData({ brands: [], installs: [], repair: [], areas: [] });
    };
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.headerContent}>
          <Link href="/" className={classes.logo}>
            <Image src={Logo} alt="Logo" />
          </Link>
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              <HeaderNav
                navItems={navItems}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                data={data}
              />
            </ul>
          </nav>
          <button
            className={classes.contactButton}
            onClick={() => setIsMenuOpen(true)}
          >
            <Typography variant="h5" weight="regular">
              Contact us
            </Typography>
          </button>
          {isMenuOpen && (
            <Modal onClose={() => setIsMenuOpen(false)} isOpen={isMenuOpen}>
              <Form isModal={true} />
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
