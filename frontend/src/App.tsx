import { Select, Button, Layout, List, Menu, MenuProps, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { apiClient } from "./api-client";
import { useEffect, useState } from "react";
import { ListForm } from "./ListForm";
import { TodoForm } from "./TodoForm";
import {Item, TodoList} from "./api-types";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export default function App() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);
  const [showListForm, setShowListForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedListItems, setSelectedListItems] = useState<Item[]>([]);

  useEffect(() => {
    apiClient.getLists().then(setLists);
  }, []);

  useEffect(() => {
    if (selectedList) {
      apiClient.getTodos(selectedList.id).then(setSelectedListItems);
    }
  }, [selectedList]);

  const handleItemClick = (key: string) => {
    if (key === 'add') {
      setSelectedList(null);
      setShowListForm(true);
    } else {
      const list = lists.find((list) => list.id === key);
      setSelectedList(list || null);
    }
  };

  const items: MenuItem[] = lists.map((list) => ({
    key: list.id,
    label: (
        <div>
          {list.name}
          <Button
              type="link"
              size="small"
              onClick={() => handleListDelete(list.id)}
              style={{ marginLeft: '10px', color: 'red' }}
          >
            Delete
          </Button>
        </div>
    ),
  }));

  function handleListAdded(list: { id: string, name: string, status: 'todo' | 'done' }): void {
    console.debug('-- handleListAdded', list);
    apiClient.addList(list).then((result) => {
      console.debug('-- handleListAdded result', result);
      setLists(result);
    });
    setShowListForm(false);
  }

  function handleTodoAdded(todo: { id: string, name: string, status: 'todo' | 'done' }): void {
    if (selectedList) {
      apiClient.addTodo(selectedList.id, todo).then(setSelectedListItems);
    }
    setShowTodoForm(false);
  }

  function handleListDelete(listId: string): void {
    Modal.confirm({
      title: 'Are you sure you want to delete this list?',
      content: 'This action cannot be undone.',
      onOk: () => {
        apiClient.deleteList(listId).then(() => {
          setLists(lists.filter(list => list.id !== listId));
          setSelectedList(null);
        }).catch((error: any) => {
          console.error('Failed to delete list', error);
        });
      },
    });
  }

  function handleItemDelete(itemId: string): void {
    Modal.confirm({
      title: 'Are you sure you want to delete this todo?',
      content: 'This action cannot be undone.',
      onOk: () => {
        if (selectedList) {
          apiClient.deleteTodo(selectedList.id, itemId).then(() => {
            setSelectedListItems(selectedListItems.filter(item => item.id !== itemId));
          }).catch((error: any) => {
            console.error('Failed to delete todo', error);
          });
        }
      },
    });
  }

  const { Option } = Select;

  function handleStatusChange(listId: string, status: 'todo' | 'done'): void {
    console.debug('Changing status of list:', listId, 'to', status);
    apiClient.updateListStatus(listId, status).then((updatedList) => {
      console.debug('List updated:', updatedList);

      setLists(lists.map(list => (list.id === listId ? updatedList : list)));

      if (selectedList && selectedList.id === listId) {
        setSelectedList(updatedList);
      }
    }).catch(error => {
      console.error('Failed to update list status', error);
    });
  }

  function handleItemStatusChange(itemId: string, status: 'todo' | 'done'): void {
    if (selectedList) {
      console.debug('Changing status of item:', itemId, 'to', status);

      apiClient.updateItemStatus(selectedList.id, itemId, status).then((updatedItems) => {
        console.debug('Items updated:', updatedItems);
        setSelectedListItems(updatedItems);

        const allItemsDone = updatedItems.every(item => item.status === 'done');

        if (allItemsDone && selectedList.status !== 'done') {
          handleStatusChange(selectedList.id, 'done');
        } else if (!allItemsDone && selectedList.status !== 'todo') {
          handleStatusChange(selectedList.id, 'todo');
        }
      }).catch((error: any) => {
        console.error('Failed to update item status', error);
      });
    }
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          TODO LISTS
      </Header>
      <Layout>
        <Sider width={200} style={{ background: 'black' }}>
          <Menu
            theme="dark"
            mode="inline"
            items={[{key: 'add', label: 'Add list', icon: <PlusOutlined />}, ...items]}
            onClick={(e) => handleItemClick(e.key)}
          />
        </Sider>
        <Content
          style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          }}    
        >
          {showListForm && <ListForm onListAdded={handleListAdded} />}
          {selectedList && (
            <div>
              <h2>{selectedList.name}</h2>
              <p>Status:
                <Select
                  value={selectedList.status}
                  onChange={(value) => handleStatusChange(selectedList.id, value)}
                  style={{ width: 120 }}
                >
                  <Option value="todo">Todo</Option>
                  <Option value="done">Done</Option>
                </Select>
              </p>
              <Button onClick={() => setShowTodoForm(true)}>Add Todo</Button>
              <List
                dataSource={selectedListItems}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    {item.name} -
                    <Select
                      value={item.status}
                      onChange={(value) => handleItemStatusChange(item.id, value)}
                      style={{ width: 120 }}
                    >
                      <Option value="todo">Todo</Option>
                      <Option value="done">Done</Option>
                    </Select>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => handleItemDelete(item.id)}
                      style={{ marginLeft: '10px', color: 'red' }}
                    >
                      Delete
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          )}
          {!selectedList && !showListForm && <div>Select a list</div>}    
          {showTodoForm && <TodoForm onTodoAdded={handleTodoAdded} />}
        </Content>
      </Layout>
    </Layout>
  )
}