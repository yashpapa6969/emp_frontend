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
import { AddIcon, ChevronDownIcon} from "@chakra-ui/icons";
import { IoPeopleOutline, IoPersonAddOutline, IoPricetagOutline } from 'react-icons/io5';
import { LiaProjectDiagramSolid, LiaTtySolid } from 'react-icons/lia';
import { MdOutlineAddTask } from 'react-icons/md';
import { LuNewspaper } from 'react-icons/lu';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';

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

  const currentDate = new Date();
  const dateString = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`
  const timeString = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

  return (
    <>
      <div className="w-full h-[70px] bg-[#172032] flex items-center justify-between px-4">
        <div className="text-white cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}><RiMenu2Fill /></div>
        <div className="flex gap-4 items-center justify-center">
          <div className='text-white'>
            {dateString} {timeString}
          </div>
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
              <MenuItem>
                <Link to="/home" className='w-full flex gap-3 items-center'><IoMdHome size={16} /> Dashboard</Link>
              </MenuItem>
                <MenuItem icon={<IoIosLogOut size={16} />} onClick={handleLogout}>
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
              rounded={"full"}
              colorScheme='purple'
              bg={"purple.700"}
              size={"sm"}
            />
            <MenuList>
              <MenuGroup title='Quick Create'>
                <MenuItem>
                  <Link to={"/createEmp"} className='w-full flex items-center gap-3'><IoPersonAddOutline size={16} /> Employee</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createInvoice"} className='w-full flex items-center gap-3'><HiOutlineDocumentDuplicate size={16} /> Invoice</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createProject"} className='w-full flex items-center gap-3'><LiaProjectDiagramSolid size={18} /> Project</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createClient"} className='w-full flex items-center gap-3'><IoPeopleOutline size={18} /> Client</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createLead"} className='w-full flex items-center gap-3'><LiaTtySolid /> Lead</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createTask"} className='w-full flex items-center gap-3'><MdOutlineAddTask size={18} /> Task</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createTag"} className='w-full flex items-center gap-3'><IoPricetagOutline /> Tag</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/createSlip"} className='w-full flex items-center gap-3'><LuNewspaper /> Slip</Link>
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
