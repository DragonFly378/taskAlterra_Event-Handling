import Button from "../components/Button";
// import SideNavbar from "../components/SideNavbar";

import { useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");

  const [complete, setComplete] = useState(false);

  const [tmp, setTmp] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Membuat Komponen",
      completed: false,
    },
    {
      id: 2,
      title: "Unit Testing",
      completed: false,
    },
    {
      id: 3,
      title: "Setup Development Environment",
      completed: false,
    },
    {
      id: 4,
      title: "Deploy ke server",
      completed: false,
    },
  ]);

  /* jika task nya selesai, maka nilai akan disimpan 
  kedalam variabel obj.complete, lalu dikembalikan lagi ke setTmp */
  // console.log(tmp);
  const checkCompleted = (obj, tmp, setTmp) => {
    if (obj.completed == false) {
      obj.completed = true;
      setTmp(obj.completed);
    } else {
      obj.completed = false;
      setTmp(obj.completed);
    }
    // console.log(tmp);
  };

  /* Delete Task */
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /* Add task */
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  /* ketika disubmit, data akan dikirim ke addTask */
  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Tambahkan Task Gan!");
      return;
    }
    console.log(title);

    addTask({
      title,
      // complete,
    });

    setTitle("");
    setComplete("");
  };

  return (
    <>
      <div className="home-section">
        <div className="container">
          <div className="header">
            <div className="judul">Todos</div>{" "}
            <p>
              Tambahkan list <br />{" "}
              <span> Kebutuhan/Tugas/Belanjaan/Dosa/Pahala</span> <br /> Anda
              dimari...
            </p>
          </div>

          <div className="konten">
            <form className="addtask" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Add todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button text={"Add Task"} color={"black"} type="submit" />
            </form>
            <div className="showtask">
              {tasks.map((task, index) => {
                return (
                  <div className="row" key={task.id}>
                    <div style={{ display: "flex" }}>
                      <input
                        onChange={() => checkCompleted(task, tmp, setTmp)}
                        type="checkbox"
                        className="checkbox"
                      />
                      <div
                        className={`task-title ${
                          task.completed ? "completed" : ""
                        }`}
                      >
                        {task.title}
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteTask(task.id)}
                      text={"Delete"}
                      color={"red"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
