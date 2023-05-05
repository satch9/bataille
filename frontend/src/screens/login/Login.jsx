import './login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuthContext } from './../../context/AuthContext';


const Login = () => {

    const { login } = useAuthContext()


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if ((values.username !== '' || values.username !== undefined) && (values.password !== '' || values.password !== undefined) && login(values.username, values.password)) {
            console.log('login ok')
        }

    };
    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Se souvenir de moi</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Mot de passe oublié
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Connexion
                    </Button>
                    Ou <a href="/register">enregistrez-vous maintenant!</a>
                </Form.Item>
            </Form>
        </div>



    );
}

export default Login
