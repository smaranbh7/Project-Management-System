import { CheckCircledIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"

function SubscriptionCard({data}) {
  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
        <p>{data.planName}</p>
        <p>
            <span className="text-xl font-semibold">${data.price}/</span>
            <span>{data.planType}</span>
        </p>
        {data.planType === "ANNUALLY" && <p className="text-green-500">30% off</p>}

        <Button className="w-full bg-white text-black hover:bg-white/90">
            {data.buttonName}
        </Button>
        <div className="space-y-2">
           {data.features.map((item) => (
             <div key={item} className="flex items-center gap-2">
                <CheckCircledIcon className="h-4 w-4" />
                <p>{item}</p>
             </div>
           ))}
        </div>
    </div>
  )
}

export { SubscriptionCard }
