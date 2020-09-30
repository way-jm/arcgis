import React from 'react';
import {Modal, Form, Row, Button,ConfigProvider} from 'antd';

import getFields from "./getFields";

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 19},
  },
};

interface updateFormProps {
  columns: Array<any>,
  isUpdate?: number,
  detail?: Object,
  modalVisible: boolean;
  onCancel: () => void;
  rowKey?: string,
  rules?: [],
  onOK: (values: any) => void;
}

const CreateForm: React.FC<updateFormProps> = (props) => {
  let {modalVisible, onCancel, columns, onOK, detail} = props;
  const [form] = Form.useForm();
  const createInitValues = () => {
    const initValue = {};
    if (detail) return detail;
    return initValue;
  };
  const onFinish = (values:any) => {
    onOK(values);
  };

  columns = columns.filter(column => {
    return column.valueType !== 'option' && !column.hideInCreate;
  });


  return (
    <Modal
      title='新建'
      visible={modalVisible}
      width={700}
      destroyOnClose
      onCancel={() => onCancel()}
      footer={[
        <Button key="back" onClick={() => onCancel()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          确定
        </Button>
      ]}
    >
      <Form
        name="create"
        form={form}
        onFinish={onFinish}
        initialValues={createInitValues() as any}
      >
        <Row gutter={24}>{getFields(columns, formItemLayout)}</Row>

      </Form>

    </Modal>
  );
};

export default CreateForm;
