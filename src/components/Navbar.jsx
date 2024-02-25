import { Avatar } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { selectUser, clearUser } from "../store/slice/UserSlice";
import { Link } from "react-router-dom";

import { RiMenu2Fill } from "react-icons/ri";
import { IoIosLogOut, IoMdHome } from "react-icons/io";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div className="w-full h-[70px] bg-[#172032] flex items-center justify-between px-4">
        <div className="text-white cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}><RiMenu2Fill /></div>
        <div className="flex gap-2 items-center justify-center">
          <Menu>
            <MenuButton righticon={<ChevronDownIcon />}>
              <Avatar size='sm' name={user.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/UserInfo">My Profile</Link>
              </MenuItem>
              <MenuDivider />
              <MenuGroup title='Profile'>
                <MenuItem>
                  <Link to="/home" className="flex gap-2 items-center justify-center"><IoMdHome /> Dashboard</Link>
                </MenuItem>
                <MenuItem>
                  <div className="flex gap-2 items-center justify-center" onClick={handleLogout}><IoIosLogOut /> Logout</div>
                </MenuItem>
              </MenuGroup>
              {/* <MenuDivider />
              <MenuGroup title='Help'>
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup> */}
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
