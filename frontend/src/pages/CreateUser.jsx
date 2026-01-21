import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/userApi';

function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    telephone: '',
    age: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser({
      ...form,
      age: Number(form.age),
    });

    navigate('/users');
  };

  return (
    <div className="container mt-4">
      <h3>Create User</h3>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" name="password" placeholder="Password" onChange={handleChange} />
        <input className="form-control mb-2" name="telephone" placeholder="Telephone" onChange={handleChange} />
        <input className="form-control mb-2" name="age" placeholder="Age" onChange={handleChange} />

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
