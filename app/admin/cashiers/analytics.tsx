import CardPoint from "@/components/CardPoint";
import { Analytic } from "@/types/analytic";

const Analytics = ({ analytics }: { analytics: Analytic[] }) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 my-4 w-full">
      {analytics.map((item, index) => (
        <CardPoint
          key={index}
          title={item.title}
          icon={item.icon}
          value={item.value}
          information={item.information}
        />
      ))}
    </div>
  );
};

export default Analytics;
