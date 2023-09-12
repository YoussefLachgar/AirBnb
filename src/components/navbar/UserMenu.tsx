'use client';

import { AiOutlineMenu } from 'react-icons/ai'
// import Avatar from '../Avatar';
import Avatar from 'react-avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux/store';
import { logout } from '@/redux/feautres/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';


const UserMenu = () => {
    const auth = useSelector((state: RootState) => { return state.auth})
    const dispatch = useDispatch();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen ] = useState(false);

    const toggleOpen = useCallback( () => {
        setIsOpen((value) => !value);
    }, []);

    const onLogout = async () => {
        try {
          const resultAction = await dispatch(logout());
          const actualAction = unwrapResult(resultAction);
          setIsOpen(false);
          // Now you can use `actualAction` with the correct type
        } catch (error) {
          // Handle any errors here
          console.log("logout error : ");
        }
      };
    
    return ( 
        <div className="relative">
            <div className=" flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className=" hidden md:block text-sm font-semibold px-3 py-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb Your Home
                </div>
                <div
                    onClick={toggleOpen}
                    className=" 
                        p-4
                        md:py-1 
                        md:px-2
                        border-[1px] 
                        border-neutral-200 
                        flex
                        flex-row
                         items-center
                        gap-3
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className=' hidden md:block'>
                        <Avatar
                            name={auth.user?.username}
                            className=' rounded-full'
                            size="30"
                            // round="30"
                        />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className=' absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className=' flex flex-col cursor-pointer'>
                    {auth.isLoggedIn ? (
                        <>
                            <MenuItem 
                            label="My trips" 
                            onClick={()=> {}}
                            // onClick={() => router.push('/trips')}
                            />
                            <MenuItem 
                            label="My favorites" 
                            onClick={()=> {}}
                            // onClick={() => router.push('/favorites')}
                            />
                            <MenuItem 
                            label="My reservations" 
                            onClick={()=> {}}
                            // onClick={() => router.push('/reservations')}
                            />
                            <MenuItem 
                            label="My properties" 
                            onClick={()=> {}}
                            // onClick={() => router.push('/properties')}
                            />
                            <MenuItem 
                            label="Airbnb your home" 
                            onClick={()=> {}}
                            // onClick={rentModal.onOpen}
                            />
                            <hr />
                            <MenuItem 
                            label="Logout" 
                            onClick={onLogout}
                            // onClick={() => signOut()}
                            />
                        </>
                        ) : (
                        <>
                            <MenuItem 
                            label="Login" 
                            onClick={() => {
                                setIsOpen(false);
                                loginModal.onOpen();
                            }}
                            />
                            <MenuItem 
                            label="Sign up" 
                            onClick={() => {
                                setIsOpen(false);
                                registerModal.onOpen();
                            }}
                            />
                        </>
                        )}
                        {/* <>
                            <MenuItem 
                                onClick={() => {
                                    setIsOpen(false);
                                    loginModal.onOpen();
                                }}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign up"
                            />
                        </> */}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default UserMenu;