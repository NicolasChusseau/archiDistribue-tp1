import { Form, Input, Button, Select } from 'antd';

interface ListFormProps {
  onListAdded?: (list: { id: string, name: string, status: 'todo' | 'done' }) => void;
}

export const ListForm = ({ onListAdded }: ListFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { id: string, name: string, status: 'todo' | 'done' }) => {
    form.resetFields();
    if (onListAdded) {
      onListAdded(values);
    }
  };

  return (
      <Form
          form={form}
          onFinish={handleSubmit}
          layout="inline"
      >
        <Form.Item
            name="id"
            rules={[{ required: true, message: 'Please enter an id for the list' }]}
        >
          <Input placeholder="Enter list ID" />
        </Form.Item>

        <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter a list name' }]}
        >
          <Input placeholder="Enter list name" />
        </Form.Item>

        <Form.Item
            name="status"
            rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select placeholder="Select list status">
            <Select.Option value="todo">Todo</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create List
          </Button>
        </Form.Item>
      </Form>
  );
};
