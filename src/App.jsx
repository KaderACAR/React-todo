import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container } from "react-bootstrap";
import "./App.css";
import styled, { ThemeProvider }  from "styled-components";
import Modal from "react-bootstrap/Modal";
import { IoMdSunny, IoIosMoon } from "react-icons/io";
import ReactDragListView from "react-drag-listview"
import { nanoid } from "nanoid";


const GlobalStyle = styled.div`
 background-color: ${(props) => props.theme.background};
 color: ${(props) => props.theme.color};
 min-height: 100vh;
 padding:20px;
 transition: all 0.2s ease-in-out;
` 

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [date, setDate] = useState("");
  const handleClose = () => setShowModal(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [modalInput, setModalInput] = useState("");
  const [show, setShow] = useState(false);
  const [todoAltInput, setTodoAltInput] = useState("")
  const [isImportant, setIsImportant] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
 


  const addTodo = (event) => {
    event.preventDefault();
    if (todoInput && todoAltInput && date) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: nanoid(), todo: todoInput, altTodo: todoAltInput, date, completed: false, isImportant: false },
        
      ]);
      setTodoInput("");
      setTodoAltInput("");
      setDate("");
      setIsImportant(false);
      isImportant("");
    }
  };

  const deleteTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo !== todoToDelete.id)
    );
    setShowModal(false);
    setTodoToDelete(null);
  };

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };


  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

const lightTheme = {
  background: "#ffff",
  color: "#333",
};

const darkTheme = {
  background: "#0d1821",
  color: "#ffff"
};


const toggleTheme = () => {
  setIsDarkTheme((prevTheme) => !prevTheme);
};

const handleSave = () => {
  setTodoAltInput(modalInput); 
  setShow(false); 
}


const dragProps = {
  onDragEnd(fromIndex, toIndex) {
    
    const data = [...todos]
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);
   setTodos(data)
  },
  nodeSelector: 'li',
  handleSelector: 'li'
};

const handleUpdateClick = (todo) => {
  setSelectedTodo(todo);
  setShowUpdateModal(true);
};

const handleUpdateSave = () => {
  if (selectedTodo) {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === selectedTodo.id ? selectedTodo : todo
      )
    );
    setShowUpdateModal(false);
  }
};


  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle theme={isDarkTheme ? darkTheme : lightTheme} >
      <Container>
      <div>
      <label className="switch">
        <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
        <span className="slider round p-1">
        <span className="icon-container">
      {isDarkTheme ? (
        <IoMdSunny className="theme-icon-sun" /> 
      ) : (
        <IoIosMoon className="theme-icon" /> 
      )}
    </span>
        </span>
      </label>
      </div>
        <Form onSubmit={addTodo}>
          <Form.Group className="text-center m-4">
            <Form.Label className="mb-2 " style={{fontSize: "24px", fontWeight:"600", fontFamily:"Sixtyfour Convergence, serif", paddingBottom:"50px"}} >TO DO LIST</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="text"
                placeholder="Görev Giriniz..."
                value={todoInput}
                onInput={(e) => {
                  setTodoInput(e.target.value)
                }}
                className="w-50 mx-3"
                style={{
                  width: "35%",
                  borderRadius: "20px",
                  border: "2px solid rgb(102, 166, 230)",
                }}
              />

                <Form.Control
                type="text"
                placeholder="Alt Görev Giriniz..."
                value={todoAltInput}
                onClick={() => {
                    setModalInput(todoAltInput); 
                    setShow(true);
        }}
                className="w-50 mx-3"
                style={{
                  width: "35%",
                  borderRadius: "20px",
                  border: "2px solid rgb(102, 166, 230)",
                }}
              />

              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className=" mx-3"
                style={{
                  width: "4%",
                  padding:"10px",
                  borderRadius: "20px",
                  border: "2px solid rgb(102, 166, 230)",
                }}
              />
              <Button
                style={{
                  width: "10%",
                  borderRadius: "20px",
                  border: "2px solid rgb(102, 166, 230)",
                }}
                type="submit"
              >
                Ekle
              </Button>
            </div>
          </Form.Group>
        </Form>

        <div className=" d-flex justify-center-end mt-4">
          <Card
            style={{
              width: "95%",
              marginInline:"35px",
              borderRadius: "20px",
              border: "2px solid rgb(102, 166, 230)",
            }}
          >
            
            <Card.Body>
              <Card.Title className="text-center"
              style={{fontSize:"35px",}}>Görevler <span className="fs-3">📝</span> </Card.Title>
              {todos.length > 0 ? (
              <ReactDragListView {...dragProps}>
                <ul className="list-group">
             {todos.map((todo) => (
               <li
                 key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center mb-3"
                style={{
                cursor: "pointer",
                fontFamily: "sans-serif",
                textDecoration: todo.completed ? "line-through" : "none",
                backgroundColor: todo.isImportant ? "#b10d0d" : "#f2e8cf",
                color: todo.isImportant ? "white" : "black",
                borderRadius: 12,
                position:"relative"
                 }}
                 >
              <div className="d-flex align-items-center">
               <input
               type="checkbox"
               checked={todo.completed}
               onChange={() => toggleComplete(todo.id)}
               className="me-2"
               />

              <input
               type="checkbox"
               checked={todo.isImportant}
               onChange={(e) => {
               const newTodos = todos.map(t => {
               if (t.id === todo.id) {
                return { ...t, isImportant: e.target.checked }
               }
                 return t
              })
              setTodos(newTodos); 
              }}
              className="mx-3"
              style={{
                borderColor: isImportant ? "red" : "gray",
                borderWidth: "2px", 
                borderRadius: "5px",
                width: "20px", 
                height: "20px" 
                   }}
              />

           <small 
           className="text-muted me-2"
           onClick={() => navigator.clipboard.writeText(todo.id)}
           title="ID'yi kopyala"
            style={{
            position: "absolute",
            top: "5px",
            left: "10px",
            fontSize: "0.7rem",
            cursor:"pointer"
           }}
         >
          #{todo.id.slice(0,2)} 
          </small>

              <div>
              <strong>{todo.todo}</strong>
              <br />
              <small>{todo.altTodo}</small> 
              <br />
              <small>{todo.date}</small>
              </div>
              </div>
             
             <span className="d-flex align-items-center gap-2">
                <Button 
                  className="text-black" 
                  onClick={() => handleUpdateClick(todo)}
                  style={{ 
                    fontSize:"15px",
                    cursor: "pointer", 
                    color:"rgb(102, 166, 230)", 
                    backgroundColor:"#77B254", 
                    border:" 1px solid #123524"}}
                >
                  Güncelle
                </Button>

             <Button className="text-black" onClick={() => confirmDelete(todo)}
               style={{
               fontSize:"15px",
               backgroundColor:"#EB5353", 
               border:"1px solid #6a040f"}}
              >
                Sil
             </Button>
             </span>
             </li>
             ))}

             <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Görevi Güncelle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Görev</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedTodo?.todo || ""}
                    onChange={(e) => setSelectedTodo({
                      ...selectedTodo, 
                      todo: e.target.value
                    })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alt Görev</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedTodo?.altTodo || ""}
                    onChange={(e) => setSelectedTodo({
                      ...selectedTodo, 
                      altTodo: e.target.value
                    })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tarih</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedTodo?.date || ""}
                    onChange={(e) => setSelectedTodo({
                      ...selectedTodo, 
                      date: e.target.value
                    })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                İptal
              </Button>
              <Button variant="primary" onClick={handleUpdateSave}>
                Kaydet
              </Button>
            </Modal.Footer>
          </Modal>
               </ul>
              </ReactDragListView> 

              ) : (
                <p className="text-center text-muted">Henüz bir görev eklenmedi.</p>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alt Görev Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            placeholder="Alt Görev Giriniz..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(handleClose)}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Silme İşlemi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Görevi silmek istediğinize emin misiniz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hayır
          </Button>
          <Button variant="primary" onClick={deleteTodo}>
            Evet
          </Button>
        </Modal.Footer>
      </Modal>

    </GlobalStyle>
    </ThemeProvider>
  );
}

export default App;
