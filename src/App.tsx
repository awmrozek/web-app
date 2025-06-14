import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Todo App</h2>
              <small>
                {completedCount} of {todos.length} completed
              </small>
            </Card.Header>
            <Card.Body>
              <Form className="mb-3" onSubmit={(e) => { e.preventDefault(); addTodo() }}>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Add a new todo..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="success">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>

              {todos.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <p>No todos yet. Add one above!</p>
                </div>
              ) : (
                <ListGroup>
                  {todos.map(todo => (
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="me-3"
                        />
                        <span
                          className={todo.completed ? 'text-decoration-line-through text-muted' : ''}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div>
                        {todo.completed && (
                          <Badge bg="success" className="me-2">Done</Badge>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App

