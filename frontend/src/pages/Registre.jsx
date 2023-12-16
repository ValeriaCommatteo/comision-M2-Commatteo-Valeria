import { useForm } from "react-hook-form";
import { useAuth } from "../actions/authActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ActionButton } from "../components/eti/ActionButton";
import { Separador } from '../components/eti/Separador';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/posts");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (

    <div className="contenedor h-full">
      <div className="tarjeta flex flex-col items-center">
        <h3>Registration Form</h3>
        <div className="form">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("username", { required: true })} className="input-box" placeholder="Username" />
            {/* {errors.username && (<p className="text-red-500">Username is required</p>)} */}
            <input type="email" {...register("email", { required: true })} className="input-box" placeholder="Email" />
            {/* {errors.email && <p className="text-red-500">Email is required</p>} */}
            <input type="password" {...register("password", { required: true })} className="input-box" placeholder="Password" />
            {/* {errors.password && <p className="text-red-500">Password is required</p>} */}
            <input type="text" {...register("avatarURL", { required: false })} className="input-box" placeholder="Avatar image URL" />
            <button type="submit" className="action-button">Register</button>
          </form>
          {errors.username && (<p className="text-error">Username is required</p>)}
          {errors.email && <p className="text-error">Email is required</p>}
          {errors.password && <p className="text-error">Password is required</p>}
          <Separador />
          <p>Do you already have a registered account?</p>
          <ActionButton to="/login">Login</ActionButton>
        </div>
        {registerErrors.map((error, i) => (
          <div className="error-box" key={i}>{error}</div>
        ))}
      </div>
    </div>

  );
}

export default Register;