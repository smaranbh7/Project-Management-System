import { PlusIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import IssueCard from "./IssueCard"
import CreateIssueForm from "./CreateIssueForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "../../redux/Issue/Action"
import { useParams } from "react-router-dom"

function IssueList({title, status}) {
    const dispatch = useDispatch();
    const { issue } = useSelector(store=>store)
    const { id } = useParams();

    useEffect(()=>{
        dispatch(fetchIssues(id))
    },[id])
    
    const statusColors = {
        pending: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30", 
        done: "bg-green-500/20 text-green-300 border-green-500/30"
    };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
            {issue.issues.filter((issue=>issue.status==status)).length} issues
          </span>
        </div>
      </div>
      
      {/* Issues List */}
      <div className="space-y-3 flex-1 mb-6">
        {issue.issues.filter((issue=>issue.status==status)).map((item)=>(
          <IssueCard projectId={id} item={item} key={item.id}/>
        ))}
        
        {issue.issues.filter((issue=>issue.status==status)).length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">No issues in this status</p>
          </div>
        )}
      </div>
      
      {/* Add Issue Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors border border-white/20 hover:border-white/30">
            <PlusIcon className="w-4 h-4" />
            Add Issue
          </button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default IssueList
