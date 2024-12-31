const useDateAndNums = () => {
    // Function to convert Western numerals to Arabic numerals
    const useNums = ( lang :string , string: string | number): string => {
   
      const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      const current = typeof string === "number" ? string.toString() : string;

      if(lang == 'en' )return current;
      
      return current?.replace(/[0-9]/g, (num) => arabicNumerals[parseInt(num, 10)]) || "";
    };
  
    // Helper function to ensure the date is in ISO 8601 format
    const normalizeDate = (date: string | Date | null): Date | null => {
      if (!date) return null;
      const parsedDate = new Date(date);
  
      // Check if the parsed date is valid
      if (!isNaN(parsedDate.getTime())) return parsedDate;
  
      // Try converting manually if parsing failed (Safari workaround)
      if (typeof date === "string") {
        const isoDate = date.replace(/-/g, "/").replace(/T/, " ").replace(/Z$/, "");
        const fallbackDate = new Date(isoDate);
        return !isNaN(fallbackDate.getTime()) ? fallbackDate : null;
      }
  
      return null;
    };
  
    // Helper function to format a date in English
    const useEnglishDates = (date: string | Date): string => {
      const validDate = normalizeDate(date);
      if (!validDate) return "Invalid Date";
  
      // Format using Intl.DateTimeFormat
      const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  
      return formatter.format(validDate);
    };
  
    // Helper function to format a date in Arabic
    const useArabicDates = (date: string | Date): string => {
      const validDate = normalizeDate(date);
      if (!validDate) return "تاريخ غير صالح";
  
      // Format using Intl.DateTimeFormat
      const formatter = new Intl.DateTimeFormat("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  
      // Convert numbers in the formatted string to Arabic numerals
      return useNums("ar",formatter.format(validDate));
    };





    const handleDate = (date: string | Date | number): Date | null => {
      if (typeof date === "string" || typeof date === "number") {
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
      } else if (date instanceof Date) {
        return isNaN(date.getTime()) ? null : date;
      }
      return null;
    };

    const useDate = (date: string | Date | number , lang:string): string | null => {

      const dateLang = lang == 'ar' ? 'ar-EG' : "en-US"
      const validDate = handleDate(date);
      // if (!validDate){
      //   if(lang == 'ar') return "تاريخ غير صالح";
      //   else return "Invalid Date";
      // } 
      if (!validDate) return null;
    
      // Format the date manually
      const options: Intl.DateTimeFormatOptions = {
        month: "short", // Abbreviated month, e.g., "Nov"
        day: "numeric", // Numeric day, e.g., "7"
        year: "numeric", // Full year, e.g., "2020"
      };
    
      const formatter = new Intl.DateTimeFormat(dateLang, options);

      if(lang == 'ar')  return useNums("ar",formatter.format(validDate)); // to use arabic nums
      else return formatter.format(validDate).toUpperCase(); // Convert to uppercase for "NOV"
    };
  
    return { useArabicDates, useEnglishDates, useNums , useDate };
  };
  
  export default useDateAndNums;
  