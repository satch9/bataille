import './scoreBoard.css'

import { Table } from 'antd';

const columns = [
    {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        render: (_, record) => (
            `#${record.key}`
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    }
];

const data = [
    {
        key: '1',
        name: 'Jue Vincent'
    },
    {
        key: '2',
        name: 'Jim Green'
    },
    {
        key: '3',
        name: 'Joe Black'
    },
];
const ScoreBoard = () => {
    return (
        <div className='scoreboard'>
            <Table columns={columns}  dataSource={data} pagination={false} />
        </div>
    )
}

export default ScoreBoard
