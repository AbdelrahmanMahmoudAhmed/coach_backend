"use client";
import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { DangerIcon, ChavIcon } from "@/assets/icons";
import { FormInputs } from "@/types/interfaces";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { displayLoader, hideLoader } from "@/store/features/globalSlice";
import Modal from "@/components/general/Modal";
import withValidations, { WithValidationsProps } from "@/HOC/WithTranslation";
import  notify  from "@/utils/notify";

import DropDown from "@/components/general/DropDown";
import Select, {
  StylesConfig,
  GroupBase,
  SingleValue,
  MultiValue,
  ActionMeta,
} from "react-select";
import { Option } from "@/types/types";
// Options with images and text
const options = [
  {
    value: "genral department",
    label: "genral department",
  },
  {
    value: "web development",
    label: "web development",
  },
];

const ContactForm: React.FC<WithValidationsProps> = ({ validations }) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const VALIDATIONS = validations;
  const [isDepartmentErrors, setIsDepartmentErrors] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [requestType, setRequestType] = useState<"success" | "failed">(
    "success"
  );


  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      title: "",
      message: "",
      department: "",
    },
  });


  const handleChange = (
    newValue: SingleValue<Option> | MultiValue<Option>, // This allows handling both single and multiple selections
    actionMeta: ActionMeta<Option> // ActionMeta provides additional meta information
  ) => {


    // When the selection is a single value
    if (newValue && 'value' in newValue) {
      setValue('department', newValue.value);
    }
  
    // When the selection is multiple values
    // else if (Array.isArray(newValue)) {
    //   // Handle multiple values (you can join them or process them as needed)
    //   setValue('department', newValue.map(option => option.value).join(', ')); // Example of joining values into a string
    // }


    trigger('department') // revalidate the input

  };
  useEffect(() => {}, []);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (formData: FormInputs) => {

    notify("hello", { type: 'success' });

    dispatch(displayLoader());
    const payload = {
      department: formData.department,
      name: formData.name,
      email: formData.email,
      title: formData.title,
      message: formData.message.replace(/\n/g, "<br />"),
    };
    try {
    } catch (err) {
    } finally {
      dispatch(hideLoader());
    }
  };

  // const trigger = () => {
  //   handleSubmit(onSubmit);
  // };

  return (
    <>
      {showModal && (
        <Modal closeModal={closeModal} title={requestType}>
          <div>
            {requestType == "success" ? (
              <>
                <h4 className=" mb-6 font-bold text-[16px] sm:text-[20px] md:text-[22px] ">
                  {t("popup.thanks")}
                </h4>
                <p>{t("popup.success_message")}</p>
              </>
            ) : (
              <p>{t("popup.failed_message")}</p>
            )}
          </div>
        </Modal>
      )}

      <form onSubmit={ handleSubmit(onSubmit)}>
        <div className="mb-5 w-full ">
          <DropDown
            {...register("department", { ...VALIDATIONS.department })}
            options={options}
            isMulti={false}
            placeholder={t("inputs.departments")}
            onChange={handleChange}
          />

{errors.department && (
            <p className=" input-err">
              <DangerIcon />
              {t(`validation_msg.${errors.department.message}`)}
            </p>
          )}

  
        </div>

        <div className="mb-5 w-full ">
          <input
            {...register("name", { ...VALIDATIONS.name })}
            type="text"
            placeholder={t("inputs.name_placeholder")}
            className="input-style  "
          />

          {errors.name && (
            <p className=" input-err">
              <DangerIcon />
              {t(`validation_msg.${errors.name.message}`)}
            </p>
          )}
        </div>

        <div className="mb-5 w-full ">
          <input
            {...register("email", { ...VALIDATIONS.email })}
            type="email"
            placeholder={t("inputs.email_placeholder")}
            className="input-style  "
          />
          {/* for errors */}
          {errors.email && (
            <p className=" input-err">
              <DangerIcon />
              {t(`validation_msg.${errors.email.message}`)}
            </p>
          )}
        </div>

        <div className="mb-5 w-full ">
          <input
            {...register("title", { ...VALIDATIONS.name })}
            type="text"
            placeholder={t("inputs.subject_placeholder")}
            className="input-style  "
          />

          {errors.title && (
            <p className=" input-err">
              <DangerIcon />
              {t(`validation_msg.${errors.title.message}`)}
            </p>
          )}
        </div>

        <div className="mb-5 w-full ">
          <textarea
            {...register("message", { ...VALIDATIONS.message })}
            rows={6}
            placeholder={t("inputs.message_placeholder")}
            className="input-style h-[185px] "
          ></textarea>

          {errors.message && (
            <p className=" input-err">
              <DangerIcon />
              {t(`validation_msg.${errors.message.message}`)}
            </p>
          )}
        </div>
        <input
          className=" w-[150px] cursor-pointer  text-white text-[16px] font-[700] h-[45px] px-[32px] bg-gradient-to-r from-[#FF3F00] to-[#FF8100] rounded-[50px] hover:opacity-80 xl:text-[18px] 2xl:h-[55px] 2xl:px-[40px] "
          type="submit"
          value={t("inputs.send")}
        />
      </form>
    </>
  );
};

export default withValidations(ContactForm);
