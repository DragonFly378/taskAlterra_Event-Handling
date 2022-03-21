import React, { Component, useState } from "react";
import Button from "../components/Button";

export default class HomeClass extends Component {
  constructor(props) {
    super(props);

    this.data = {
      title: "",
      complete: false,
      tmp: false,
    };

    this.state = {
      data: [
        {
          id: 1,
          title: "Membuat Komponen",
          completed: false,
        },
        {
          id: 2,
          title: "Unit Testing",
          completed: true,
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
      ],
    };
  }
  state = {
    title: "",
  };
  /* jika task nya selesai, maka nilai dari akan disimpan 
  kedalam variabel obj.complete, lalu dikembalikan lagi ke setTmp */
  checkCompleted = (obj, tmp, setTmp) => {
    if (tmp) {
      obj.completed = false;
      tmp = obj.completed;
    } else {
      obj.completed = true;
      tmp = obj.completed;
    }
    // console.log(this.data.complete);
    console.log(tmp);
  };

  /* Delete Task */
  deleteTask = (id) => {
    const newTask = this.state.data.filter((task) => task.id !== id);

    this.setState({ data: newTask });
  };

  /* Add task */
  addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    this.setState({ data: [...this.state.data, newTask] });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /* ketika disubmit, data akan dikirim ke addTask */
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title) {
      alert("Tambahkan Task Gan!");
      return;
    }
    this.addTask({
      title: this.state.title,
    });
    // console.log(newData);
    this.setState({
      title: "",
    });
  };
  render() {
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
              <form className="addtask" onSubmit={this.onSubmit}>
                <input
                  name="title"
                  type="text"
                  placeholder="Add todo..."
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <Button text={"Add Task"} color={"black"} type="submit" />
              </form>
              <div className="showtask">
                {this.state.data.map((task, index) => {
                  return (
                    <div className="row" key={task.id}>
                      <div style={{ display: "flex" }}>
                        <input
                          onChange={() =>
                            this.checkCompleted(
                              task,
                              this.data.tmp
                              // this.data.setTmp
                            )
                          }
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
                        onClick={() => {
                          this.deleteTask(task.id);
                        }}
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
  }
}
