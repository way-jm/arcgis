import React, {useState, useEffect} from 'react';
import {Card, Button, Table } from "antd";
import {PlusOutlined} from '@ant-design/icons';
import SearchForm from "./SearchForm";
import './MainTable.less';

interface tablePropsType {
  rowKey?: string,
  reload?:any,
  needNew?:boolean,
  request: (e: any) => Promise<{ code:any, data:any }>,
  dataExport?:any,
  initValue?:any,
  extra?:any,
  expandedRowKeys?:any
  expandableKey?:any,
  onPageChange?:any
  fileName?: string,
  createNew?:any,
  columns: {
    hideInTable?: boolean,
    oneLine?: boolean,
    ellipsis?: boolean,
    step?:any
    title: string
  }[]
}

const paginationConfig: {
  size: 'default' | 'small',
  showSizeChanger: boolean
} = {
  size: 'small',
  showSizeChanger: true
};

const MainTable: React.FC<tablePropsType> = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userParams, setUserParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const {request, rowKey, columns, createNew, fileName, initValue, onPageChange,expandableKey} = props;

  useEffect(() => {
    getList().catch(e => {
      console.log(e);
    });
    // eslint-disable-next-line
  }, [props.reload]);

  const getList = async (params = {}) => {
    setLoading(true);
    const res = await request({pageNum, pageSize, ...userParams, ...params});
    setLoading(false);
    if (res.code === 0) {
      setData(res.data.rows);
      setTotal(res.data.total);
      const rows = res.data.rows
      if(expandableKey){
        let keys = []
        for(let i=0;i<rows.length;i++){
          // @ts-ignore
          keys.push(rows[i][rowKey])
        }
        // @ts-ignore
        setExpandedRowKeys(keys)
      }
    }
  };
  return <div className='table-form'>
    <SearchForm
      columns={columns}
      fileName={fileName}
      initValue={initValue}
      onSubmit={(values:any) => {
        setUserParams(values);
        setPageNum(1);
        return getList({...values, pageNum: 1});
      }}
    />
    <Card bodyStyle={{padding: 0}}>
      <div className='toolBar'>
        <div className='table-toolbar-title' style={{textAlign:'left'}}>查询结果</div>
        {props.needNew ? <div className='table-toolbar-option'>
          <div className='table-toolbar-item'><Button type='primary' onClick={() => {
            createNew();
          }}><PlusOutlined/>新建</Button></div>
        </div> : null}
        {props.extra}
      </div>
      <div className='tableWrapper'>

        <Table
          columns={columns.filter(item => !item.hideInTable)}
          dataSource={data}
          rowKey={rowKey || 'smid'}
          loading={loading}
          expandedRowKeys={expandedRowKeys}
          expandIcon={()=>null}
          expandable={expandableKey?{
            expandedRowRender: (record:any) => <p style={{ margin: 0 }}>{record[expandableKey]}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }:undefined}

            pagination={
            {
              ...paginationConfig,
              total: total,
              current: pageNum,
              "showTotal": (total, range) => `第${range[0]}-${range[1]}条/共${total} 条`,
              pageSize: pageSize,
              "onChange": (pageNum, pageSize) => {
                setPageNum(pageNum);
                if (onPageChange) onPageChange(pageNum, pageSize);
                return getList({pageNum, pageSize});
              },
              "onShowSizeChange": (pageNum, pageSize) => {
                setPageSize(pageSize);
                setPageNum(1);
                if (onPageChange) onPageChange(1, pageSize);
                return getList({pageNum: 1, pageSize});
              },
              defaultCurrent: 1
            }
          }/>
      </div>
    </Card>
  </div>;
};

export default MainTable;
