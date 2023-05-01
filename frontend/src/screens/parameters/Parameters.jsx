import FloatButtonChat from '../../components/FloatButtonChat'
import {
    Button,
    Form,
    Select,
} from 'antd';
//import { useState } from 'react'

import './parameters.css'
import { socket } from '../../context/IoContext';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};


const Paramaters = () => {
    //const [partyName, setPartyName] = useState('');
    const navigate = useNavigate();

    /* const generateFakeNameParty = () => {
        fetch('https://random-word-api.herokuapp.com/word?number=1&length=15')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                let date = new Date().toLocaleDateString('fr-fr', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '')
                //console.log("date", date)
                setPartyName(data[0] + date);
            })
            .catch(error => {
                console.error(error);
            });
    } */

    const onFinish = (values) => {
        console.log('Received values of form: ', values.select);

        //generateFakeNameParty();
        socket.emit('parameters', { numCards: parseInt(values.select) })
        socket.on('game-created', (data) => {

            navigate('/game/' + data.gameId)

        })
    };

    return (
        <div className='parameters'>
            <Form
                name="form-parameters"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    'numberCards': 32,
                }}
            >
                <Form.Item
                    name="select"
                    label="Nombre de cartes"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Choisissez le nombre total de cartes dans le paquet!',
                        },
                    ]}
                >
                    <Select placeholder="Sélectionnez un nombre de cartes">
                        <Option value="32">32</Option>
                        <Option value="52">52</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 6,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Valider
                    </Button>
                </Form.Item>
            </Form>
            <FloatButtonChat />
        </div>
    )
}

export default Paramaters
