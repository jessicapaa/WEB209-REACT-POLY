import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    categories: string;
}

function App() {
    const [todos, setTodo] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/products");
            setTodo(response.data);
        };
        fetchData();
    }, []);
    const [count, setCount] = useState(0);
    const [newtodo, setNewtodo] = useState("");
    const handleClickAdd = async () => {
        if (!newtodo.trim()) {
            return alert("Vui lòng nhập vào title");
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/products",
                {
                    title: newtodo,
                    complete: true,
                }
            );

            setTodo([...todos, response.data]);
            setNewtodo("");
            alert("Thêm mới thành công !");
        } catch (error) {
            alert("Thêm thất bại rồi");
        }
    };
    const Set_new_todo = (value: string) => {
        setNewtodo(value);
    };
    const onDelete = async (id: number | string) => {
        if (confirm("Bạn có muốn xóa sản phẩm không ?")) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/products/${id}`
                );

                if (response.status === 200) {
                    const newTodos = todos.filter((todo) => todo.id !== id);
                    setTodo(newTodos);
                    alert("Xóa sản phẩm thành công !");
                } else {
                    alert("Xóa sản phẩm thất bại ! | Vui lòng thử lại.");
                }
            } catch (error) {
                alert("Xóa sản phẩm thất bại ! | Vui lòng thử lại.");
            }
        }
    };

    const changeStatus = (id: number | string) => {
        const newtodos = todos.map((todo) => {
            if (todo.id == id) {
                todo.complete = !todo.complete;
            }
            return todo;
        });
        setTodo(newtodos);
    };
    const updateTodo = async (id: number | string) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/products/${id}`,
                {
                    title: newtodo,
                    complete: true,
                }
            );
            const updatedTodo = response.data;
            const updatedTodos = todos.map((todo) =>
                todo.id === id ? updatedTodo : todo
            );

            setTodo(updatedTodos);
            alert("Cập nhật sản phẩm thành công !");
        } catch (error) {
            alert("Cập nhật sản phẩm thất bại !");
        }
    };

    return (
        <>
            <input type="text" onChange={(e) => Set_new_todo(e.target.value)} />
            <button onClick={handleClickAdd}>Thêm danh sách</button>
            <ul>
                {todos.map((todo: IProduct) =>
                    todo.complete ? (
                        <li key={todo.id}>
                            {" "}
                            {todo.title}
                            <button
                                onClick={() => {
                                    changeStatus(todo.id);
                                }}
                            >
                                Sửa
                            </button>{" "}
                            <button onClick={() => onDelete(todo.id)}>
                                Xóa
                            </button>
                        </li>
                    ) : (
                        <li key={todo.id}>
                            <input
                                type="text"
                                defaultValue={todo.title}
                                onChange={(e) => Set_new_todo(e.target.value)}
                            />
                            <button onClick={() => updateTodo(todo.id)}>
                                Lưu
                            </button>
                            <button onClick={() => changeStatus(todo.id)}>
                                Hủy
                            </button>
                        </li>
                    )
                )}
            </ul>
        </>
    );
}

export default App;
