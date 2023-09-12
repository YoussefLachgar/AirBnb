'use client';

import { useDispatch, useSelector } from "react-redux";
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Heading from '../Heading';
import Input from "../inputs/Input";
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Modal from './Modal';


import { login } from "@/redux/feautres/auth.slice";
import { clearMessage } from "@/redux/feautres/message.slice";
import { AppDispatch, RootState } from "@/redux/store";

function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
    const { message } = useSelector((state: RootState) => state.message);

    // const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
    // const { message } = useSelector((state: RootState) => state.message);

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          username: '',
          password: ''
        },
      });

      const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      }, [registerModal, loginModal]);
      
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        // axios.post('/api/register', data)
        // .then(() => {
        //   loginModal.onClose();
        // })
        // .catch((error) => {
        //   console.log(error);
        //   toast.error('Something Went Wrong !')
        // })
        // .finally(() => {
        //   setIsLoading(false);
        // })

        console.log("you are in the submit function!!!")
        const { username, password } = data;
        // setIsLoading(true);

        dispatch(login({ username, password }))
          .unwrap()
          .then(() => {
            console.log("you are loged in");
            loginModal.onClose();
            setIsLoading(false);
            // window.location.reload();

          })
          .catch(() => {
            console.log("ther is a problem here .");
            setIsLoading(false);
          });
      };

      const bodyContent = (
        <div className=" flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />
            <Input
              id="username"
              label="UserName"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
        </div>
      );

      const footerContent = (
        <div className="flex flex-col mt-3 gap-4">
          <hr />
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
           />
           <Button
            outline
            label="Continue with GitHub"
            icon={AiFillGithub}
            onClick={() => {}}
           />
           <div className=" text-neutral-400 text-center mt-4 font-light">
              <div className=" justify-center flex flex-row items-center gap-2">
              <p>First time using Airbnb?
                <span 
                  onClick={onToggle} 
                  className="
                    text-neutral-800
                    cursor-pointer 
                    hover:underline
                  "
                  > Create an account</span>
              </p>
              </div>
           </div>
        </div>
      );

  return (
    <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
  )
}

export default LoginModal