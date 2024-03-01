import { Avatar, IconButton } from '@chakra-ui/react'
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
import { AddIcon, ChevronDownIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons";
import { IoPeopleOutline, IoPersonAddOutline, IoPricetagOutline } from 'react-icons/io5';
import { LiaProjectDiagramSolid, LiaTtySolid } from 'react-icons/lia';
import { MdOutlineAddTask } from 'react-icons/md';
import { LuNewspaper } from 'react-icons/lu';

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
        <div className="flex gap-4 items-center justify-center">
          <Menu>
            <MenuButton righticon={<ChevronDownIcon />}>
              <Avatar size='sm' name={user.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/UserInfo" className='w-full'>My Profile</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/getAllTodo" className='w-full'>To do List</Link>
              </MenuItem>
              <MenuDivider />
              <MenuGroup title='Profile'>
                <MenuItem icon={<IoMdHome size={18} />}>
                  Dashboard
                </MenuItem>
                <MenuItem icon={<IoIosLogOut size={16} />}>
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<AddIcon />}
            />
            <MenuList>
              <MenuGroup title='Quick Create'>
                <MenuItem icon={<IoPersonAddOutline size={16} />}>
                  <Link to={"/createEmp"} className='w-full'>Employee</Link>
                </MenuItem>
                <MenuItem icon={<LiaProjectDiagramSolid size={18} />}>
                  <Link to={"/createProject"} className='w-full'>Project</Link>
                </MenuItem>
                <MenuItem icon={<IoPeopleOutline size={18} />}>
                  <Link to={"/createClient"} className='w-full'>Client</Link>
                </MenuItem>
                <MenuItem icon={<LiaTtySolid />}>
                  <Link to={"/createLead"} className='w-full'>Lead</Link>
                </MenuItem>
                <MenuItem icon={<MdOutlineAddTask size={18} />}>
                  <Link to={"/createTask"} className='w-full'>Task</Link>
                </MenuItem>
                <MenuItem icon={<IoPricetagOutline />}>
                  <Link to={"/createTag"} className='w-full'>Tag</Link>
                </MenuItem>
                <MenuItem icon={<LuNewspaper />}>
                  <Link to={"/createSlip"} className='w-full'>Slip</Link>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Navbar;
