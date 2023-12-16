import { useForm } from "react-hook-form";
import { useAuth } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../components/eti/ActionButton";
import { Separador } from '../components/eti/Separador';
import './stylePages.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();  // Utiliza useNavigate para obtener la función de navegación

  const onSubmit = async (data) => {

    try {
      await signin(data);

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="contenedor h-full">
      <div className="tarjeta flex flex-col items-center">
        <h3>Login</h3>
        <div className="form">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email", { required: true })} className="input-box" placeholder="Email" />
            {/* {errors.email && <p className="text-red-500">Email is required</p>} */}
            <input type="password" {...register("password", { required: true })} className="input-box" placeholder="Password" />
            {/* {errors.password && <p className="text-red-500">Password is required</p>} */}
            <button type="submit" className="action-button">Login</button>
          </form>
          {errors.email && <p className="text-error">Email is required</p>}
          {errors.password && <p className="text-error">Password is required</p>}
          <Separador />
          <p>Don't have a registered account?</p>
          {/* <p className="flex justify-center px-4 py-2">
            <ActionButton to="/register" className="px-3 font-semibold rounded-md text-white bg-cyan-400">Register</ActionButton>
          </p> */}
          <ActionButton to="/register">Register</ActionButton>
        </div>
      </div>
    </div>

  );
}

export default Login;