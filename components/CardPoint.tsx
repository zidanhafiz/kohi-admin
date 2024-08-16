import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

const CardPoint = ({ title, value, icon, information }: { title: string; value: string | number; icon: ReactNode; information: string | number }) => {
  return (
    <Card className='max-w-md w-full shadow'>
      <CardHeader className='flex flex-row justify-between items-center pt-4 pb-1'>
        <h2 className='font-medium'>{title}</h2>
        {icon}
      </CardHeader>
      <CardContent className='py-1'>
        <p className='text-2xl font-extrabold'>{value}</p>
      </CardContent>
      <CardFooter className='pt-1 pb-5'>
        <p className='text-sm text-neutral-500'>{information}</p>
      </CardFooter>
    </Card>
  );
};

export default CardPoint;
