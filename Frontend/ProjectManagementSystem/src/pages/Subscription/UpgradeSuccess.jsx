
import { Card } from '../../components/ui/card'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'

function UpgradeSuccess() {
    const navigate= useNavigate();
  return (
    <div className='flex-justify-center'>
        <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
            <div className='flex itesm-center gap-4'>
                <CheckCircledIcon className='h-9 w-9 text-green-500'/>
                <p className='text-xl'>Plan Upgraded Successfully!</p>
            </div>
            <div className='space-y-3'>
                <p className='text-green-500'>Start date:</p>
                <p className='text-red-500'>End date: </p>
                <p>Plan Type: </p>
                
            </div>
            <Button onClick={()=>navigate("/")}>Go to home</Button>

        </Card>
      
    </div>
  )
}

export default UpgradeSuccess
