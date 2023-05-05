import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate
} from "react-router-dom"
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";

import { Layout, Menu } from 'antd';
import './App.css'
import { HomeOutlined, ControlOutlined, LoginOutlined, LogoutOutlined, RocketOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';

import Home from './screens/home/Home';
import Parameters from './screens/parameters/Parameters';
import Login from './screens/login/Login';
import Chat from './screens/chat/Chat';
import Game from './screens/game/Game';
import ListGame from './screens/game/list/ListGame';
import Register from "./screens/register/Register";




const { Header, Content, Footer } = Layout;


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext()
  return token ? children : <Navigate to="/" replace={true} />

}


function App() {
  const [current, setCurrent] = useState('');
  const { token, logout } = useAuthContext();
  const { id } = useParams()

  console.log('id', id)

  /* const items = [
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
  ]; */

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
          {
            /* items.map((item) =>
              item.items ? (
                token &&
                <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                  {item.items.map((subItem) => (
                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                      <Link to={subItem.path}>{subItem.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                (item.key === 'home' && item.key === 'login') && !token ?
                  <Menu.Item key={item.key} icon={item.icon}>
                    <a href={item.path}>{item.label}</a>
                  </Menu.Item>
                  : (item.key === 'logout') && !token ?
                    <Menu.Item key={item.key} icon={item.icon}>
                      <a href={item.path}>{item.label}</a>
                    </Menu.Item>
                    : (item.key === 'game') && token ?
                      <Menu.Item key={item.key} icon={item.icon}>
                        <a href={item.path}>{item.label}</a>
                      </Menu.Item>
                      : null
              )
            ) */
            token ? (
              <>
                <Menu.Item key="home" icon={<HomeOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Link to="/home">Accueil</Link>
                </Menu.Item>
                <Menu.SubMenu key="game" title="game" icon={<RocketOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Menu.Item key="parameters" icon={<ControlOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                    <Link to="/parameters">Paramètres</Link>
                  </Menu.Item>
                  <Menu.Item key="list" icon={<UnorderedListOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                    <Link to="/game/list">Liste</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                {/* <Menu.Item key="chat" icon={<WechatOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Link to="/chat">Chat</Link>
                </Menu.Item> */}
                <Menu.Item key="logout" icon={<LogoutOutlined style={{ fontSize: '25px', color: 'white' }} />} onClick={logout}>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="home" icon={<HomeOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Link to="/home">Accueil</Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<LoginOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Link to="/">Connexion</Link>
                </Menu.Item>
                <Menu.Item key="register" icon={<UserAddOutlined style={{ fontSize: '25px', color: 'white' }} />}>
                  <Link to="/register">Inscription</Link>
                </Menu.Item>
              </>
            )
          }
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />


            <Route
              path="/chat"
              element={<ProtectedRoute><Chat /></ProtectedRoute>}
            />
            <Route
              path="/game/:id"
              element={<ProtectedRoute><Game /></ProtectedRoute>}
            />
            <Route
              path="/game/list"
              element={<ProtectedRoute><ListGame /></ProtectedRoute>}
            />
            <Route
              path="/parameters"
              element={<ProtectedRoute><Parameters /></ProtectedRoute>}
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>La bataille ©2023 Created by Jue Vincent</Footer>
    </Layout>

  )
}

export default App