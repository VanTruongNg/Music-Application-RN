export const otpFormat = (message: string) => {
    let otp: any = message.match(/[0-9]{4}/g);
    if (otp) {
      otp = otp[0];
    }
    return otp;
  };
  export const isNumber = (num: any): boolean => {
    return !isNaN(parseFloat(String(num)));
  };
  
  export const formatNumber = (number: number) => {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };
  
  export const formatFullDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const monthNames = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];
  
    const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;
    return formattedDate;
  };
  