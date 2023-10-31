import { useNavigate } from "react-router-dom"
import { useFormLoginInternalUser } from "../hooks/useFormLoginInternalUser.js";

const LoginPage = () => {

  // Navigate sirve para navegar entre las rutas
  const navigate = useNavigate();

  const { user, passwordLoginInternalUser, OnInputChangeLoginInternalUser, OnResetFormLoginInternalUser } = useFormLoginInternalUser({
    user: '',
    passwordLoginInternalUser: ''
  })

  const onLogin = (e) => {
    e.preventDefault()

    navigate('/dashboard', {
      replace: true,
      state: {
        logged: true,
        user,
        passwordLoginInternalUser
      }
    })

    OnResetFormLoginInternalUser()
  }

  return (
    <>

      <div className="wrapper">
        <div>
          <form onSubmit={onLogin}>
            <h2>Iniciar sesión</h2>
            <div className="input-group">
              <input
                type="text"
                name="user"
                id="user"
                value={user}
                onChange={OnInputChangeLoginInternalUser}
                required
                autoComplete="off"
                placeholder="Usuario" />

            </div>
            {/********************************************************/}
            <div className="input-group">
              <input
                type="password"
                name="passwordLoginInternalUser"
                id="passwordLoginInternalUser"
                value={passwordLoginInternalUser}
                onChange={OnInputChangeLoginInternalUser}
                required
                autoComplete="off"
                placeholder="Contraseña" />
            </div>
            <button>INGRESAR</button>
          </form>
          <div className="input-group">
            .......................................
            <br />
            <br />
            <button>Recupero de Contraseña</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default LoginPage

