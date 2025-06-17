import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import CreateProjectForm from "../Project/CreateProjectForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/Action";
import { Flame } from "lucide-react";
import { useEffect } from "react";
import { getUserSubscription } from "../../redux/Subscription/Action";

function Navbar() {
  const { subscription, auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(()=>{
    if(auth?.user){
      dispatch(getUserSubscription());
    }
  },[dispatch, auth?.user])

  const currentPlan = subscription?.userSubscription?.planType;
  
  return (
    <div className="h-14 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer mr-8 hover:text-blue-400 transition-colors"
        >
          Project Management
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              New project
            </button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/upgrade_plan")}
          className="text-sm bg-orange-500/20 text-orange-300 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/30"
        >
          Upgrade plan
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                <PersonIcon className="w-4 h-4 text-slate-300" />
              </div>
              {currentPlan === "MONTHLY" ||
               currentPlan === "ANNUALLY" ? (
                <>
                  {auth.user?.fullName?.split(" ")[0]}{" "}
                  <span className="text-orange-400 text-xs font-semibold ml-1">
                    <Flame size={23} className="text-orange-400" />(Pro)
                  </span>
                </>
              ) : (
                auth.user?.fullName?.split(" ")[0]
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 bg-slate-800 border-slate-700"
          >
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-sm text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
