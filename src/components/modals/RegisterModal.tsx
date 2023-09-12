'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/feautres/auth.slice";
// import { User } from "@/redux/feautres/auth.slice";

const RegisterModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [ isLoading, setIsLoading ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { username, email, password } = data;
        console.log("data : ", data);
        dispatch(registerUser({ username, email, password }))
          .unwrap()
          .then(() => {
            console.log("you are register in");
            registerModal.onClose();
            setIsLoading(false);
            // window.location.reload();

          })
          .catch(() => {
            console.log("ther is a problem here .");
            setIsLoading(false);
          });
        // dispatch(register({ username, email, password }))
        //   .unwrap()
        //   .then(() => {
        //     console.log("then : ")
        //   })
        //   .catch(() => {
        //     console.log("catch : ")
        //   });
      }

      const bodyContent = (
        <div className=" flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Creat an account!" />
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
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
                  <div>Already have an account!</div>
                  <div onClick={onToggle} className=" text-neutral-800 cursor-pointer hover:underline">Login</div>
              </div>
           </div>
        </div>
      );

    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;