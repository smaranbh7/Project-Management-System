import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import {
  fetchProjectById,
  updateProjectStatus,
} from "../../redux/Project/Action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserSubscription } from "../../redux/Subscription/Action";
import FreePlanChatDisplay from "./FreePlanChatDisplay";

function ProjectDetails() {
  const dispatch = useDispatch();
  const { project, subscription } = useSelector((store) => store);
  const { id } = useParams();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      console.log("Updating status to:", newStatus);
      dispatch(updateProjectStatus(id, newStatus));
      console.log("Status update completed");
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "ACTIVE") {
      return (
        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30">
          Active
        </Badge>
      );
    } else if (status === "CLOSED") {
      return (
        <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30">
          Closed
        </Badge>
      );
    }
    return (
      <Badge className="bg-slate-500/20 text-slate-300 border border-slate-500/30">
        Unknown
      </Badge>
    );
  };

  console.log("--->" + subscription.userSubscription?.planType);
  const currentPlan = subscription.userSubscription?.planType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Subtle Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-900/20 to-transparent"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="lg:flex gap-8">
          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Project Header */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-white mb-6">
                {project.projectDetails?.name}
              </h1>

              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                {project.projectDetails?.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Project Lead
                  </h3>
                  <p className="text-white text-lg">
                    {project.projectDetails?.owner.fullName}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Category
                  </h3>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {project.projectDetails?.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Team Members
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {project.projectDetails?.team.map((item) => (
                        <Avatar
                          className="w-10 h-10 border-2 border-slate-700 hover:border-blue-500 transition-colors"
                          key={item.id}
                        >
                          <AvatarFallback className="bg-slate-700 text-white">
                            {item.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                          <PlusIcon className="w-4 h-4" />
                          Invite
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader className="text-white">
                          Invite User
                        </DialogHeader>
                        <InviteUserForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Status
                  </h3>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(project.projectDetails?.status)}

                    <Select
                      value={project.projectDetails?.status || "ACTIVE"}
                      onValueChange={handleStatusChange}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem
                          value="ACTIVE"
                          className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value="CLOSED"
                          className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                        >
                          Closed
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {isUpdatingStatus && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">Tasks</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <IssueList status="pending" title="To Do" />
                <IssueList status="in_progress" title="In Progress" />
                <IssueList status="done" title="Completed" />
              </div>
            </div>
          </main>

          {/* Sidebar */}
          {currentPlan === "MONTHLY" || currentPlan === "ANNUALLY" ? (
            <aside className="lg:w-96 mt-8 lg:mt-0">
              <div className="sticky top-8">
                <ChatBox />
              </div>
            </aside>
          ) : (
            <div>
                <aside className="lg:w-96 mt-8 lg:mt-0">
              <div className="sticky top-8">
                <FreePlanChatDisplay />
              </div>
            </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
