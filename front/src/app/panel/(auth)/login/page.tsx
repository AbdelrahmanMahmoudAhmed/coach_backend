"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/hooks/useThemeHook";
import { LoginInputs } from "@/types/interfaces";
import { getCookies, setCookies } from "@/utils/cookiesManipulate";
import notify from "@/utils/notify";

import Image from "next/image";
import {
  ShowPasswordIcon,
  NotShowPassword,
  DangerIcon,
} from "@/public/assets/icons";
import { useLocale } from "next-intl";
import withValidations, { WithValidationsProps } from "@/HOC/WithTranslation";
import api from "@/services/clientApis";
// validation and APIs
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
// import { storeAuth } from '@/lib/features/authSlice';
import { useForm } from "react-hook-form";

const PanelLoginPage: React.FC<WithValidationsProps> = ({ validations }) => {
  const router = useRouter();
  const { login } = api;
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const [showPass, setShowPass] = useState(false);
  //
  // const dispatch = useDispatch();
  //   const authData = useSelector((state) => state.auth.authData);
  //   const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const VALIDATIONS = validations;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<LoginInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (fromData: LoginInputs) => {
    const payloadData = {
      email: fromData.email,
      password: fromData.password,
    };
    setIsProcessing(true);

    try {
      const res = await login(payloadData);
      setCookies({ name: "token", value: res?.token });
      router.replace("/panel");
    } catch (err: unknown) {
      const error = err as { customCode?: string };
      if (error?.customCode) {
        notify(t(`errors.requests.${error.customCode}`), { type: "error" });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const changeShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center ">
      <div>
        <Image
          src={`/assets/imgs/${theme == "dark" ? "dark-logo" : "logo"}.png`}
          alt="logo"
          width={104}
          height={64}
        />
      </div>

      <div className="  text-black dark:text-white relative w-full pt-[50px] flex justify-center">
        <div className="  relative flex w-[90%] flex-col overflow-y-auto rounded-lg max-w-[600px] shadow-lg border border-slate-300 outline-none dark:border-none dark:footer-bg focus:outline-none sm:w-[80%] lg:w-[50%]">
         
          <div className=" rounded-t border-b border-solid border-gray-300 dark:border-slate-500 p-5 ">
            <h1 className="font=semibold text-center text-3xl">
              {" "}
              {t(`panel.login`)}
            </h1>
          </div>
         
          <div className=" relative flex-auto p-6  ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="  w-full rounded px-1  pb-8 pt-6 md:px-8 "
            >
              <div>
                <div className="mb-5">
                  <input
                    {...register("email", { ...VALIDATIONS.email })}
                    placeholder={t("inputs.email_placeholder")}
                    className="input-style "
                  />

                 
                  {errors.email && (
                    <p className=" input-err">
                      <DangerIcon />
                      {t(`validation_msg.${errors.email.message}`)}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <div className="relative">
                    <span
                      onClick={changeShowPass}
                      className={` ${
                        locale == "ar" ? " left-[18px] " : "right-[18px] "
                      } ${
                        showPass ? "hidden" : "block"
                      } absolute top-[18px] cursor-pointer `}
                    >
                      <ShowPasswordIcon />
                    </span>
                    <span
                      onClick={changeShowPass}
                      className={` ${
                        locale == "ar" ? " left-[18px] " : "right-[18px] "
                      } ${
                        showPass ? "block" : "hidden"
                      } absolute top-[18px] cursor-pointer `}
                    >
                      <NotShowPassword />
                    </span>
                    <input
                      {...register("password", { ...VALIDATIONS.password })}
                      type={showPass ? "text" : "password"}
                      placeholder={t("inputs.password_placeholder")}
                      className="input-style "
                    />
                    {/* for errors */}
                    {errors.password && (
                      <p className=" input-err">
                        <DangerIcon />
                        {t(`validation_msg.${errors.password.message}`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={isProcessing}
                className=" mt-10 h-12 w-full rounded-lg bg-primary text-center hover:opacity-80 disabled:opacity-65 text-white"
                type="submit"
              >
                {isProcessing ? t("panel.is_processing") : t("panel.login")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withValidations(PanelLoginPage);
