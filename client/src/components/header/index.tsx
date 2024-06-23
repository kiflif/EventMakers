import React, { useState } from "react";
import {
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  FireOutlined,
  PlusCircleOutlined,
  BulbOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice";
import { CustomButton } from "../custom-button";
import style from "./index.module.css";
import iconImage from './BUL2aeAB.png';


export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
/*  const [darkTheme, setDarkTheme] = useState(false); */

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  /* const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle("dark-theme");
  }; */

  return (
    <Layout.Header className={style.header}>
      <Space>
        <Link to="/"  >
        
          <CustomButton type="ghost">
          <img src={iconImage} alt="Icon" className={style.icon} /> 
            Сотрудники | Bumble Bee
          </CustomButton>
        </Link>
        <Link to="/">
        <CustomButton
       
       type="ghost"
       icon={<ContactsOutlined />}
       
     >
      Распределение ролей (скоро)
     </CustomButton>
     </Link>
      </Space>
      
      {user ? (
        
        <Space>
          <Link to="/event">
            <CustomButton type="ghost"   icon={<PlusCircleOutlined />}>
              Забить Мероприятие
            </CustomButton>
          </Link>
        <Link to="/information">
            <CustomButton type="ghost"   icon={<FireOutlined />}>
              Мафия
            </CustomButton>
          </Link>
        <CustomButton
        
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
       
        
        </Space> 
        
        
        
      ) : (
        <Space>
          <Link to="/register">
            <CustomButton type="ghost"  icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="ghost"  icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
          <Space>
      </Space>
          
          
        </Space>
        
      )}
      
      
      
    </Layout.Header>
  );
};
