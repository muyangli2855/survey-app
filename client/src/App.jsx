import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    feedback: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://survey-app-server-bo9d.onrender.com/submit", form);
      setMessage("提交成功！");
      setForm({ name: "", age: "", feedback: "" });
    } catch {
      setMessage("提交失败，请重试");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>问卷调查</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="姓名" required />
        <input name="age" value={form.age} onChange={handleChange} placeholder="年龄" type="number" required />
        <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="意见或建议" />
        <button type="submit">提交</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
