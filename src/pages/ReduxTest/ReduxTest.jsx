import { useDispatch } from "react-redux";
import {
  userLoginThunk,
  userLogoutThunk,
  userRefreshThunk,
  userRegisterThunk,
} from "../../redux/auth/operations";
import { useEffect } from "react";

const ReduxTest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);

  return (
    <>
      <button
        onClick={() =>
          dispatch(
            userRegisterThunk({
              username: "Jack",
              email: "jack753@mail.com",
              password: "jack753@mail.com",
            })
          )
        }
      >
        Register
      </button>
      <button
        onClick={() =>
          dispatch(
            userLoginThunk({
              email: "jack753@mail.com",
              password: "jack753@mail.com",
            })
          )
        }
      >
        Login
      </button>
      <button onClick={() => dispatch(userLogoutThunk())}>Logout</button>
    </>
  );
};

export default ReduxTest;
