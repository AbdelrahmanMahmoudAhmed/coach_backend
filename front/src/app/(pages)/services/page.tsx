"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import useDateAndNums from "@/utils/datesAndNums";
import LetsTalk from "@/components/general/LetsTalk";
import PageTitle from "@/components/general/PageTitle";
import Title from "@/components/general/Title";
import { Service } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { destinations } from "@/utils/constants";
import Link from "next/link";
function Services() {
  const locale = useLocale();
  const { useNums } = useDateAndNums();
  const searchParams = useSearchParams();

  const paramValue = searchParams.get("section");


  const t = useTranslations();
  const quote = `Our company has a great history and an outstanding team with
            experience in delivering exceptional projects for prestigious
            clients.`;

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name_en: "Web Development",
      name_ar: "تطوير الويب",
      isActive: true,
      isComingSoon: false,
      description_ar:
        "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
      description_en:
        "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
      featuers_img: "/assets/imgs/web_development.png",
      featuers: [
        {
          id: "1",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "2",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
        {
          id: "3",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "4",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
      ],
      projects: [
        {
          id: "1",
          color: "#00AAE1",

          img: "/assets/imgs/home/four.png",
          title_ar: "موقع سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce Website",
          description_ar:
            "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "2",
          color: "#F11237",

          img: "/assets/imgs/home/three.png",
          title_ar: "تطبيق سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "3",
          color: "#FF6B00",

          img: "/assets/imgs/home/two.png",
          title_ar: "تطبيق سينما برايم بلس",
          title_en: "Cinema Prime Plus App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "4",
          color: "#0963FF",

          img: "/assets/imgs/home/one.png",
          title_ar: "موقع التجارة الإلكترونية Market Bff",
          title_en: "Market Bff E-commerce Website",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
      ],
    },
    {
      id: "2",
      name_en: "Web Design",
      name_ar: "تصميم الويب",
      isActive: false,
      isComingSoon: false,
      description_ar:
        "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
      description_en:
        "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
      featuers_img: "/assets/imgs/web_design.png",
      featuers: [
        {
          id: "1",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "2",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
        {
          id: "3",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "4",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
      ],
      projects: [
        {
          id: "1",
          color: "#00AAE1",

          img: "/assets/imgs/home/four.png",
          title_ar: "موقع سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce Website",
          description_ar:
            "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "2",
          color: "#F11237",

          img: "/assets/imgs/home/three.png",
          title_ar: "تطبيق سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "3",
          color: "#FF6B00",

          img: "/assets/imgs/home/two.png",
          title_ar: "تطبيق سينما برايم بلس",
          title_en: "Cinema Prime Plus App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "4",
          color: "#0963FF",

          img: "/assets/imgs/home/one.png",
          title_ar: "موقع التجارة الإلكترونية Market Bff",
          title_en: "Market Bff E-commerce Website",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
      ],
    },
    {
      id: "3",
      name_en: "Gaming",
      name_ar: "الألعاب",
      isActive: false,
      isComingSoon: false,
      description_ar:
        "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
      description_en:
        "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
      featuers_img: "/assets/imgs/gaming.png",
      featuers: [
        {
          id: "1",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "2",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
        {
          id: "3",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "4",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
      ],
      projects: [
        {
          id: "1",
          color: "#00AAE1",

          img: "/assets/imgs/home/four.png",
          title_ar: "موقع سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce Website",
          description_ar:
            "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "2",
          color: "#F11237",

          img: "/assets/imgs/home/three.png",
          title_ar: "تطبيق سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "3",
          color: "#FF6B00",

          img: "/assets/imgs/home/two.png",
          title_ar: "تطبيق سينما برايم بلس",
          title_en: "Cinema Prime Plus App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "4",
          color: "#0963FF",

          img: "/assets/imgs/home/one.png",
          title_ar: "موقع التجارة الإلكترونية Market Bff",
          title_en: "Market Bff E-commerce Website",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
      ],
    },
    {
      id: "4",
      name_en: "Mobile App Development",
      name_ar: "تطوير تطبيقات الهاتف المحمول",
      isActive: false,
      isComingSoon: false,
      description_ar:
        "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
      description_en:
        "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
      featuers_img: "/assets/imgs/mobile_app.png",
      featuers: [
        {
          id: "1",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "2",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
        {
          id: "3",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "4",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
      ],
      projects: [
        {
          id: "1",
          color: "#00AAE1",

          img: "/assets/imgs/home/four.png",
          title_ar: "موقع سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce Website",
          description_ar:
            "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "2",
          color: "#F11237",

          img: "/assets/imgs/home/three.png",
          title_ar: "تطبيق سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "3",
          color: "#FF6B00",

          img: "/assets/imgs/home/two.png",
          title_ar: "تطبيق سينما برايم بلس",
          title_en: "Cinema Prime Plus App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "4",
          color: "#0963FF",

          img: "/assets/imgs/home/one.png",
          title_ar: "موقع التجارة الإلكترونية Market Bff",
          title_en: "Market Bff E-commerce Website",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
      ],
    },
    {
      id: "5",
      name_en: "ERP System",
      name_ar: "نظام تخطيط موارد المؤسسات",
      isActive: false,
      isComingSoon: true,
      description_ar:
        "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
      description_en:
        "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
      featuers_img: "/assets/imgs/mobile_app.png",
      featuers: [
        {
          id: "1",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "2",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
        {
          id: "3",
          title_ar: "تطوير الويب المخصص",
          title_en: "Custom Web Development",
          description_ar:
            "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
          description_en:
            "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
        },
        {
          id: "4",
          title_ar: "أنظمة الحجز والمواقع الإلكترونية",
          title_en: "Booking Systems & Websites",
          description_ar:
            "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
          description_en:
            "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
        },
      ],
      projects: [
        {
          id: "1",
          color: "#00AAE1",

          img: "/assets/imgs/home/four.png",
          title_ar: "موقع سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce Website",
          description_ar:
            "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "2",
          color: "#F11237",

          img: "/assets/imgs/home/three.png",
          title_ar: "تطبيق سيزما للتجارة الإلكترونية",
          title_en: "Cezma E-commerce App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "3",
          color: "#FF6B00",

          img: "/assets/imgs/home/two.png",
          title_ar: "تطبيق سينما برايم بلس",
          title_en: "Cinema Prime Plus App",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
        {
          id: "4",
          color: "#0963FF",

          img: "/assets/imgs/home/one.png",
          title_ar: "موقع التجارة الإلكترونية Market Bff",
          title_en: "Market Bff E-commerce Website",
          description_ar:
            "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
          description_en:
            "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
        },
      ],
    },
  ]);

  const [currentService, setCurrentService] = useState<Service>({
    id: "1",
    name_en: "Web Development",
    name_ar: "تطوير الويب",
    isActive: true,
    isComingSoon: false,
    description_ar:
      "We provide website development services of various kinds using the latest development techniques on the market, and we are keen to follow up on everything new to develop our existing customer’s projects and include new clients for our service.",
    description_en:
      "نحن نقدم خدمات تطوير مواقع الويب بمختلف أنواعها باستخدام أحدث تقنيات التطوير الموجودة في السوق، ونحرص على متابعة كل ما هو جديد لتطوير مشاريع عملائنا الحاليين وضم عملاء جدد لخدمتنا.",
    featuers_img: "/assets/imgs/web_development.png",
    featuers: [
      {
        id: "1",
        title_ar: "تطوير الويب المخصص",
        title_en: "Custom Web Development",
        description_ar:
          "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
        description_en:
          "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
      },
      {
        id: "2",
        title_ar: "أنظمة الحجز والمواقع الإلكترونية",
        title_en: "Booking Systems & Websites",
        description_ar:
          "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
        description_en:
          "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
      },
      {
        id: "3",
        title_ar: "تطوير الويب المخصص",
        title_en: "Custom Web Development",
        description_ar:
          "يقدم تطوير الويب المخصص حلولاً مرنة وفريدة من نوعها لتلبية احتياجات العمل وتحسين الأداء وتجربة المستخدم وضمان التكامل السلس مع الأنظمة.",
        description_en:
          "Custom web development offers flexible and unique solutions to meet business needs, improving performance, user experience, and ensuring seamless integration with systems.",
      },
      {
        id: "4",
        title_ar: "أنظمة الحجز والمواقع الإلكترونية",
        title_en: "Booking Systems & Websites",
        description_ar:
          "تعمل أنظمة الحجز والمواقع الإلكترونية على تبسيط عمليات الحجز والمواعيد، وتعزيز تجربة المستخدم من خلال أدوات الجدولة ومعالجة الدفع والإدارة السهلة.",
        description_en:
          "Booking Systems & Websites streamline reservations and appointments, enhancing user experience with easy scheduling, payment processing, and management tools.",
      },
    ],
    projects: [
      {
        id: "1",
        color: "#00AAE1",

        img: "/assets/imgs/home/four.png",
        title_ar: "موقع سيزما للتجارة الإلكترونية",
        title_en: "Cezma E-commerce Website",
        description_ar:
          "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
        description_en:
          "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      },
      {
        id: "2",
        color: "#F11237",

        img: "/assets/imgs/home/three.png",
        title_ar: "تطبيق سيزما للتجارة الإلكترونية",
        title_en: "Cezma E-commerce App",
        description_ar:
          "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
        description_en:
          "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      },
      {
        id: "3",
        color: "#FF6B00",

        img: "/assets/imgs/home/two.png",
        title_ar: "تطبيق سينما برايم بلس",
        title_en: "Cinema Prime Plus App",
        description_ar:
          "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
        description_en:
          "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      },
      {
        id: "4",
        color: "#0963FF",

        img: "/assets/imgs/home/one.png",
        title_ar: "موقع التجارة الإلكترونية Market Bff",
        title_en: "Market Bff E-commerce Website",
        description_ar:
          "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
        description_en:
          "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      },
    ],
  });

  useEffect(() => {
    const service = services.find((item) => item.id == paramValue);
    if (service) setCurrentService(service);
    else setCurrentService(services[0]);
  }, [paramValue]);

  const toggleSection = (id: String) => {
    const toggleActive = services.map((item) => {
      if (item.id == id) item.isActive = true;
      else item.isActive = false;
      return item;
    });
    setServices(toggleActive);
    const service = services.find((item) => item.id == id);
    if (service) setCurrentService(service);
  };

  return (
    <main className="app-container overflow-hidden ">
      <section className="mb-[60px]">
        <PageTitle title={t("services.title")} quote={quote} />
        <div className="w-full h-[348px] mt-[40px]">
          <img
            className=" object-cover h-full w-full rounded-[8px]"
            src="/assets/imgs/services.png"
            alt="about-us"
          />
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2 border-[#eee] pb-[16px] flex-wrap justify-center lg:justify-between lg:flex-nowrap lg:border-b xl:w-[85%] xl:mx-auto dark:border-fourth">
          {services.map((item) => (
            <span
              onClick={() => toggleSection(item.id)}
              className={`${
                item.isActive
                  ? "active-service-btn"
                  : " text-fourth dark:text-third"
              } block cursor-pointer font-[700] px-6 py-2 shadow-3xl text-[12px] rounded-full transition-all duration-150  sm:text-[16px] lg:text-[18px] lg:shadow-none lg:p-0 hover:active-service-btn dark:hover:active-service-btn `}
            >
              {locale == "ar" ? item.name_ar : item.name_en}
            </span>
          ))}
        </div>

        {currentService.isComingSoon ? (
          <div className=" my-[100px] lg:my-[120px] ">
            <Image
              className=" mx-auto mb-2"
              height={249}
              width={140}
              src={"/assets/imgs/hmaservhero.png"}
              alt="HMASERV"
            />
            <h3 className=" text-primary font-[700] text-[32px] text-center">
              {t("services.soon", {
                service:
                  locale == "ar"
                    ? currentService.name_ar
                    : currentService.name_en,
              })}
            </h3>
            <p className="text-center text-fourth font-[500] md:text-[18px] dark:text-third">
              {t("services.stay_tuned")}
            </p>
          </div>
        ) : (
          <>
            <div className=" mt-[35px] mb-[80px] lg:my-[100px]">
              <div className=" hidden md:block 2xl:hidden">
                <h3 className=" text-[32px] leading-[30px] font-[700] mb-[40px] lg:mb-[30px] lg:text-[40px] ">
                  {locale == "ar"
                    ? currentService?.name_ar
                    : currentService?.name_en}
                </h3>
                <p className=" text-[16px] mb-10  ">
                  Developing a secure and user-friendly platform that enables
                  users to buy and sell products easily, while enhancing
                  interaction between buyers and sellers through direct
                  communication features and improving the user experience to
                  facilitate browsing and product search.
                </p>
              </div>

              <div className=" flex flex-col justify-between gap-x-4 gap-y-14 lg:flex-row xl:items-center 2xl:items-end">
                <div className=" flex-1 lg:max-w-[60%] ">
                  <div className=" md:hidden 2xl:block">
                    <h3 className=" text-[32px] leading-[30px] font-[700] mb-[40px] lg:mb-[30px] lg:text-[40px] ">
                      {locale == "ar"
                        ? currentService?.name_ar
                        : currentService?.name_en}
                    </h3>
                    <p className=" text-[16px] mb-10 md:text-[18px] lg:max-w-[80%] ">
                      Developing a secure and user-friendly platform that
                      enables users to buy and sell products easily, while
                      enhancing interaction between buyers and sellers through
                      direct communication features and improving the user
                      experience to facilitate browsing and product search.
                    </p>
                  </div>

                  {currentService?.featuers ? (
                    <div className="flex flex-wrap gap-x-[4%] gap-y-4 overflow-hidden">
                      {currentService?.featuers.map((item, idx) => (
                        <div key={idx} className=" w-full sm:w-[48%] ">
                          <div className="flex justify-center sm:justify-start">
                            <Image
                              className={
                                locale == "ar" ? " mr-[-10px]" : "ml-[-10px]"
                              }
                              width={70}
                              height={70}
                              src="/assets/imgs/icons/feature.svg"
                              alt="featuers_icon"
                            />
                          </div>
                          <h5 className="font-[700] mb-3 text-[18px] text-center sm:text-start lg:text-[20px]">
                            {locale == "ar" ? item.title_ar : item.title_en}
                          </h5>
                          <p className=" text-fourth text-center sm:text-start dark:text-third">
                            {locale == "ar"
                              ? item.description_ar
                              : item.description_en}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className=" mx-auto max-w-[491px] lg:max-w-[350px] xl:max-w-[491px]">
                  {currentService?.featuers_img ? (
                    <Image
                      className=" rounded-[8px]"
                      width={491}
                      height={578}
                      src={currentService?.featuers_img}
                      alt="featuers_img"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {currentService.projects?.length ? (
              <>
                <section className="my-[100px]">
                  <Title section="services" />
                  <div className="mt-[50px]">
                    {currentService.projects.map((item, idx) => (
                      <Link
                        href={`${destinations.project}/${item.id}`}
                        className={` group cursor-pointer flex gap-x-[4%] gap-y-4 mb-20 flex-col items-center relative rounded-[8px] text-white py-10 px-6 lg:px-20 lg:flex-row 2xl:gap-x-[16%]`}
                        style={{ backgroundColor: item.color }}
                      >

                        <div className={`absolute w-[128px] h-[122px] bottom-2 lg:top-0 ${locale == 'ar' ? ' left-2' : ' right-2 '}`} >
                        <Image
                src={"/assets/imgs/home/absolute.png"}
                alt="dots"
                width={128}
                height={122}
              />
                        </div>
                        <div className="w-full lg:w-[48%] 2xl:w-[42%]">
                          <h5 className=" leading-[40px] text-[32px] font-[700] mb-6 lg:text-[40px] ">
                            {locale == "ar" ? item.title_ar : item.title_en}
                          </h5>
                          <p className=" leading-[30px] md:text-[18px] ">
                            {locale == "ar"
                              ? item.description_ar
                              : item.description_en}
                          </p>
                        </div>
                        <div className="w-full flex justify-start lg:w-[48%] 2xl:w-[42%]">
                          <Image
                            className="transition-all duration-1000 mb-4 sm:mb-0 group-hover:scale-110 "
                            width={500}
                            height={377}
                            src={item.img}
                            alt="project"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </section>

      <LetsTalk />
    </main>
  );
}

export default Services;
