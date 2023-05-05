import {
    Button,
    Checkbox,
    Form,
    Input,
} from 'antd';

import './register.css'

import { useAuthContext } from './../../context/AuthContext';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};

const Register = () => {
    const [form] = Form.useForm();
    const { register } = useAuthContext()


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (register(values.username, values.email, values.password, values.confirm)) {
            console.log('register ok')
        }
    };

    return (
        <div className="register">
            <h1>Inscris-toi!!</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            ><Form.Item
                name="username"
                label="Nomd'utilisateur"
                tooltip="Comment voulez-vous que les autres vous appellent?"
                rules={[
                    {
                        required: true,
                        message: "Merci d'insérer un nom d'utilisateur !",
                        whitespace: true,
                    },
                ]}
            >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: "Ce n'est pas un E-mail valide!",
                        },
                        {
                            required: true,
                            message: 'Merci de saisir votre E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[
                        {
                            required: true,
                            message: 'Merci de saisir votre mot de passe !',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirmez le mot de passe"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Merci de confirmer votre mot de passe!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Les deux mots de passe entrés ne correspondent pas !'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        Jai lu les <a href="">conditions</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default Register
