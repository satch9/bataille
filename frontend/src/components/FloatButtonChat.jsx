import { MessageOutlined } from '@ant-design/icons';
import { Affix, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';

import './floatButtonChat.css'


const FloatButtonChat = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/chat', { replace: true });
    };

    return (

        <Affix style={{ position: 'absolute', bottom: '50px', right: '50px' }} onClick={handleClick}>
            <div className="float-button">
                <Badge count={12}>
                    <MessageOutlined style={{ fontSize: '24px', color: '#000' }} />
                </Badge>
            </div>
        </Affix>



    )
}

export default FloatButtonChat
