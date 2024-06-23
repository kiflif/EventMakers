import React, { useState, useEffect } from 'react';
import { Layout as AntLayout } from "antd";
import { Header } from "../header";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {


  return (
   
    <div className={styles.main}>
  
      <Header />
      <AntLayout.Content >
        {children}
      </AntLayout.Content>
    </div>
  );
};