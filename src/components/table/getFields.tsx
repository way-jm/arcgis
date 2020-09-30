import {Col, Form, Input, Select, DatePicker, Checkbox, InputNumber} from "antd";
import React from "react";
import {colLayout, colLayoutOneLine, formItemLayout} from "./layout.config";

const FItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


const createField = (column:any, disabled:boolean) => {
  if (column['dataType'] === 'textarea') {
    return <TextArea disabled={column.readOnly || disabled} placeholder={column.title}/>
  }
  if (column['dataType'] === 'date') {
    return <DatePicker style={{width: '100%'}} disabled={column.readOnly || disabled}/>
  }

  if (column['dataType'] === 'dateTime') {
    return <DatePicker showTime  style={{width: '100%'}} disabled={column.readOnly || disabled}/>
  }

  if (column['dataType'] === 'inputNum') {
    return <InputNumber style={{width: '100%'}} disabled={column.readOnly || disabled} step={column.step||1} min={0}/>
  }

  if (column['dataType'] === 'checkBox') {
    return <Checkbox.Group
      options={column.options}
    />
  }
  if (column['dataType'] === 'password') {
    return <Input.Password disabled={column.readOnly || disabled} placeholder={column.title}/>
  }

  return <Input disabled={column.readOnly || disabled} placeholder={column.title}/>
};

const renderValueEnum = (column:any) => {
  return column.valueEnum.map((item:any) => {
    return <Option
      value={column.kv ? item[column.kv] : item['value']}
      key={column.kv ? item[column.kv] : item['value']}>
      {column.kn ? item[column.kn] : item['label']}
    </Option>;
  })
};
const getFields = (columns:any, fl = formItemLayout, disabled = false) => {
  const children = [];

  for (let i = 0; i < columns.length; i++) {
    const colStyle = columns[i].oneLine ? colLayoutOneLine : colLayout;
    children.push(
      <Col  {...colStyle} key={i}>
        <FItem
          {...fl}
          name={columns[i].name || columns[i].dataIndex}
          label={`${columns[i].title}`}
          rules={columns[i]['rules']}
        >
          {columns[i].valueEnum
            ? <Select disabled={columns[i].readOnly || disabled}>
              {
                renderValueEnum(columns[i])
              }
            </Select>
            : createField(columns[i], disabled)}
        </FItem>
      </Col>,
    );
  }
  return children;
};

export default getFields;
