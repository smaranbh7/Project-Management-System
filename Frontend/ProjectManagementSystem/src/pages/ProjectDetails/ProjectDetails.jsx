import { ScrollArea } from "../../components/ui/scroll-area"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../../components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import InviteUserForm from "./InviteUserForm"

function ProjectDetails() {
    const handleProjectInvitation = () =>{

    }
  return (
    <>
    <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
            <ScrollArea className="h-screen lg:w-[69%] pr-2">
                <div className="text-gray-400 pb-10 w-full">
                    <h1 className="text-lg font-semibold pb-5">
                        Create Ecommerce Website Using React
                        </h1>
                    <div className="space-y-5 pb-10 text-sm">
                    <p className="w-full md:max-w-lg lg:max-w-xl ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <div className="flex">
                        <p className="w-36">Project Lead :</p>
                        <p>Smaran Bhattarai</p>
                    </div>
                    <div className="flex">
                        <p className="w-36">Members : </p>
                        <div className="flex items-center gap-2">
                            {[1,1,1,1].map((item) =><Avatar className="cursor-pointer"  key={item}>
                                <AvatarFallback>
                                    S
                                </AvatarFallback>
                            </Avatar>)}

                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <DialogClose>
                                    <Button size="sm" variant="outline" onClick={handleProjectInvitation} className="ml-2">
                                        <span>Invite</span>
                                        <PlusIcon className="w-3 h-3"/>
                                    </Button>
                                </DialogClose>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>Invite User</DialogHeader>
                                <InviteUserForm/>
                            </DialogContent>
                        </Dialog>
                        
                    </div>
                    <div className="flex">
                        <p className="w-36">Category :</p>
                        <p>Full Stack</p>
                    </div>
                     <div className="flex">
                        <p className="w-36">Status :</p>
                        <Badge>Done</Badge>
                    </div>
                </div>    
                </div>
                
            </ScrollArea>

        </div>

    </div>
      
    </>
  )
}

export default ProjectDetails
