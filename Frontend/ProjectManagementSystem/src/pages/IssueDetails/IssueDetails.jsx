import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "../../redux/Issue/Action";
import { fetchComments } from "../../redux/Comment/Action";


function IssueDetails() {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const {issue, comment} = useSelector(store=>store)
  const handleUpdateIssueStatus = (status) =>{
    dispatch(updateIssueStatus({id:issueId,status}))
    }
  useEffect(()=>{
      dispatch(fetchIssueById(issueId));
      dispatch(fetchComments(issueId));
  },[issueId])
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'done': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Subtle Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="lg:flex gap-8">
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              {/* Issue Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {issue.issueDetails?.title}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-slate-400 font-mono">#{issueId}</span>
                  <Badge className={`border ${getStatusColor(issue.issueDetails?.status)}`}>
                    {issue.issueDetails?.status?.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Description</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {issue.issueDetails?.description}
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Comments</h2>
                <div className="space-y-6">
                  <CreateCommentForm issueId={issueId} />
                  <div className="space-y-4">
                    {comment.comments?.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-slate-400">No comments yet. Be the first to comment!</p>
                      </div>
                    ) : (
                      comment.comments.map((item) => (
                        <CommentCard item={item} key={item.id} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-8 space-y-6">
              {/* Status Selector */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Status</h3>
                <Select onValueChange={handleUpdateIssueStatus} defaultValue={issue.issueDetails?.status}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="pending" className="text-slate-200 hover:bg-slate-700">Pending</SelectItem>
                    <SelectItem value="in_progress" className="text-slate-200 hover:bg-slate-700">In Progress</SelectItem>
                    <SelectItem value="done" className="text-slate-200 hover:bg-slate-700">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Details</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Assignee</p>
                    {issue.issueDetails?.assignee?.fullName ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-700 text-white text-xs">
                            {issue.issueDetails?.assignee?.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{issue.issueDetails?.assignee?.fullName}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Unassigned</span>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Status</p>
                    <Badge className={`border ${getStatusColor(issue.issueDetails?.status)}`}>
                      {issue.issueDetails?.status?.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Created</p>
                    <span className="text-white">Recently</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
