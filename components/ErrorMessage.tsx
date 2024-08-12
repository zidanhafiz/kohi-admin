import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className='text-red-500 text-sm font-medium w-full text-center'>{children}</p>;
};

export default ErrorMessage;
