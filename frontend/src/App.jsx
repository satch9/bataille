import {
  Routes,
  Route,
  Link

} from "react-router-dom"

import { Layout, Menu } from 'antd';
import './App.css'
import { HomeOutlined, ControlOutlined, LoginOutlined, LogoutOutlined, RocketOutlined, UnorderedListOutlined } from '@ant-design/icons';

import Home from './screens/home/Home';
import Parameters from './screens/parameters/Parameters';
import Login from './screens/login/Login';
import Chat from './screens/chat/Chat';
import Game from './screens/game/Game';
import ListGame from './screens/game/list/ListGame';
import { useState } from "react";
import { useParams } from "react-router-dom"

const { Header, Content, Footer } = Layout;





function App() {
  const [current, setCurrent] = useState('');

  const { id } = useParams()

  console.log('id', id)

  const items = [
    {

      key: 'home',
      icon: <HomeOutlined style={{ fontSize: '25px', color: 'white' }} />,
      path: '/home'
    },
    {
      key: 'login',
      icon: <LoginOutlined style={{ fontSize: '25px', color: 'white' }} />,
      path: '/'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ fontSize: '25px', color: 'white' }} />,
      path: '/'
    },
    {
      key: 'game',
      icon: <RocketOutlined style={{ fontSize: '25px', color: 'white' }} />,
      path: '/game',
      items: [
        {
          label: 'Paramètres',
          key: 'parameters',
          icon: <ControlOutlined />,
          path: '/parameters'
        },
        {
          label: 'Liste',
          key: 'list',
          icon: <UnorderedListOutlined />,
          path: '/game/list'
        }
      ]
    }
  ];



  const handleMenuClick = (e) => {
    setCurrent(e.key);
  }
  return (

    <Layout className="layout">
      <Header>
        <div className="logo"><div className="title-logo"><Link to="/" >La bataille</Link></div></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          onClick={handleMenuClick}
          selectedKeys={[current]}

        >
          {items.map((item) =>
            item.items ? (
              <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                {item.items.map((subItem) => (
                  <Menu.Item key={subItem.key} icon={subItem.icon}>
                    <Link to={subItem.path}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <a href={item.path}>{item.label}</a>
              </Menu.Item>
            )
          )}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/game/list" element={<ListGame />} />
            <Route path="/parameters" element={<Parameters />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>La bataille ©2023 Created by Jue Vincent</Footer>
    </Layout>

  )
}

export default App