"use client";

import React from 'react'
import { useTranslations } from "next-intl";
import withValidations, { WithValidationsProps } from "@/HOC/WithTranslation";
import { useForm } from "react-hook-form";
import { SubscribeInputs } from "@/types/interfaces";
import {useAppDispatch} from "@/hooks/useReduxHooks" 
import { displayLoader , hideLoader } from "@/store/features/globalSlice"
import { DangerIcon, ChavIcon } from "@/assets/icons";



const Subscribe: React.FC<WithValidationsProps> = ({ validations }) => {
    const VALIDATIONS = validations;



    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm<SubscribeInputs>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
          email: "",
        },
      });

    const t = useTranslations();

    const onSubmit = async (formData: SubscribeInputs) => {
        dispatch(displayLoader())
        const payload = {
          email: formData.email,
        };
        try {
         
        } catch (err) {
        
        }finally{
        dispatch(hideLoader())
        reset(); 
    
        }
      };
    


  return (
    <section className='app-container text-white mt-[100px]'>
        <div className=" mx-auto rounded-[20px] py-[70px] bg-[url('/assets/imgs/home/subscribe.png')] bg-cover bg-center    ">
            <div className=' max-w-[700px] mx-auto px-8'>
            <h5 className=' font-[700] text-center  text-[24px] md:text-[32px] xl:text-[40px] xl:leading-[40px] '>{t('home.subscribe.title')}</h5>
                <p className='mt-[16px] text-center max-w-[480px] mx-auto'>{t('home.subscribe.p')}</p>
           
                <div>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-[40px] bg-white w-full h-[56px] rounded-[40px] p-1 gap-2 overflow-hidden flex'>
                <input 
                {...register("email", { ...VALIDATIONS.email })}
                placeholder={t('home.subscribe.enter_email')} className='w-full outline-none text-black px-4 '  />
             
                <input className=' py-2 px-4 cursor-pointer rounded-[40px] bg-gradient-to-r from-[#FF3F00] to-[#FF8100] lg:px-12 hover:opacity-75 ' type="submit" value={t('home.subscribe.subscribe')} />
            </form>
                  {/* for errors */}
                  {errors.email && (
              <p className=" input-err justify-center pt-3">
                <DangerIcon />
                {t(`validation_msg.${errors.email.message}`)}
              </p>
            )}
            </div>
            </div>

           
        </div>
    
    </section>
  )
}


export default withValidations(Subscribe);


