import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  userLoginThunk,
  userLogoutThunk,
  userRefreshThunk,
  userRegisterThunk,
} from "../../redux/auth/operations";
import {
  deleteTransactionThunk,
  getCategoriesThunk,
  getSummaryThunk,
  getTransactionsThunk,
  patchTransactionThunk,
  postTransactionThunk,
} from "../../redux/transactions/operations.js";

const ReduxTest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);

  return (
    <>
      {/* Auth */}
      <button
        onClick={() =>
          dispatch(
            userRegisterThunk({
              username: "Jack",
              email: "jack752@mail.com",
              password: "jack752@mail.com",
            })
          )
        }
      >
        register
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
        login
      </button>
      <button onClick={() => dispatch(userLogoutThunk())}>logout</button>

      {/* Transactions */}
      <button onClick={() => dispatch(getCategoriesThunk())}>
        getCategories
      </button>
      <button onClick={() => dispatch(getSummaryThunk())}>getSummary</button>
      <button onClick={() => dispatch(getTransactionsThunk())}>
        getTransactions
      </button>
      <button
        onClick={() =>
          dispatch(
            postTransactionThunk({
              transactionDate: "2024-05-30",
              type: "EXPENSE",
              categoryId: "c9d9e447-1b83-4238-8712-edc77b18b739",
              comment: "test",
              amount: -10,
            })
          )
        }
      >
        postTransaction
      </button>
      <button
        onClick={() =>
          dispatch(
            patchTransactionThunk({
              id: "41e9bc6c-ab62-48a5-acaa-183c6caa66cc",
              transactionDate: "2024-05-30",
              type: "EXPENSE",
              categoryId: "c9d9e447-1b83-4238-8712-edc77b18b739",
              comment: "test",
              amount: -50,
            })
          )
        }
      >
        patchTransaction
      </button>
      <button
        onClick={() =>
          dispatch(
            deleteTransactionThunk("ebac492b-7d66-43c6-ad63-1ffb21fa1b17")
          )
        }
      >
        deleteTransaction
      </button>
    </>
  );
};

export default ReduxTest;
