import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {

  const { state } = useLocation();

  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login', { replace: true })
  }

  return (
    <>
      <header>
        <h1>
          <Link to="/login">FactorIT</Link>
        </h1>

        {
          state?.logged ? (
            <div className="user">
              <span className="username">{state?.user}</span>
              <button className="btn-logout" onClick={onLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            <nav>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Registrarse</Link>
            </nav>
          )
        }

      </header>

      <Outlet />
    </>
  )
}

export default NavBar;