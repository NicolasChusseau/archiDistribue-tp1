import { Form, Input, Button, Select } from 'antd';

interface TodoFormProps {
  onTodoAdded?: (todo: { id: string, name: string, status: 'todo' | 'done' }) => void;
}

export const TodoForm = ({ onTodoAdded }: TodoFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { id: string, name: string, status: 'todo' | 'done' }) => {
    form.resetFields();
    if (onTodoAdded) {
      onTodoAdded(values);
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
            rules={[{ required: true, message: 'Please enter an id for the todo' }]}
        >
          <Input placeholder="Enter todo ID" />
        </Form.Item>

        <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter a todo name' }]}
        >
          <Input placeholder="Enter todo name" />
        </Form.Item>

        <Form.Item
            name="status"
            rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select placeholder="Select todo status">
            <Select.Option value="todo">Todo</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Todo
          </Button>
        </Form.Item>
      </Form>
  );
};
