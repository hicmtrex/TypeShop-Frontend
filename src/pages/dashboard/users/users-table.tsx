import { useEffect, useState } from "react";
import { Button, Pagination, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../../../components/UI/loader";
import TableContainer from "../../../components/UI/table-contrainer";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { getUsersList } from "../../../redux/users/user-list";
import authAxios from "../../../utils/auth-axios";
import { setError } from "../../../utils/error";
import { getDate } from "../../../utils/helper";

const UserTable = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    loading,
    page: curPage,
    pages,
  } = useAppSelector((state) => state.userList);

  const cols = ["name", "email", "created At", "admin", "promote", "delete"];
  const [refresh, setRefresh] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(curPage);

  const onDelete = (id: string | number) => {
    if (window.confirm("are you sure?")) {
      authAxios
        .delete(`/users/${id}`)
        .then((res) => {
          toast.success("user has beend deleted");
          setRefresh((prev) => (prev = !prev));
        })
        .catch((e) => toast.error(setError(e)));
    }
  };

  const onPromote = (id: string | number) => {
    if (window.confirm("are you sure?")) {
      authAxios
        .post(`/users/promote/${id}`)
        .then((res) => {
          toast.success("user has beend promoted");
          setRefresh((prev) => (prev = !prev));
        })
        .catch((e) => toast.error(setError(e)));
    }
  };

  useEffect(() => {
    dispatch(getUsersList({ page, query: search }));
  }, [dispatch, refresh, page, search]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row className="py-3">
          <h3 className="d-flex justify-content-between align-items-center">
            <span>User List</span>
            {/* <Button size='sm'>Add User</Button> */}
          </h3>
          <TableContainer cols={cols}>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getDate(user.createdAt)}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {" "}
                  {!user?.isAdmin && (
                    <Button
                      onClick={() => onPromote(user._id)}
                      variant="success"
                      size="sm"
                      className="me-3"
                    >
                      Promote
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => onDelete(user._id)}
                    variant="danger"
                    size="sm"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </TableContainer>
          <Pagination className="overflow-auto mt-5">
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                active={x + 1 === page}
                onClick={() => setPage(x + 1)}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>
      )}
    </>
  );
};

export default UserTable;
