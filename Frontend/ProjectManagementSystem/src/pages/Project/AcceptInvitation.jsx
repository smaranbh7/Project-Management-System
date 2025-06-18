import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { acceptInvitation } from '../../redux/Project/Action'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckCircle, UserPlus, ArrowRight, Mail, Calendar, Users } from 'lucide-react';

function AcceptInvitation() {
    const dispatch = useDispatch()
    const { project } = useSelector((store) => store);
    const location = useLocation();
    const navigate = useNavigate();
    const [isAccepting, setIsAccepting] = useState(false);
    const [error, setError] = useState('');
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Invalid invitation link. Please check your email for the correct link.');
        }
    }, [token]);

    const handleAcceptInvitation = () => {
        if (!token) return;
        
        setIsAccepting(true);
        setError('');
        
        try {
             dispatch(acceptInvitation({ token, navigate }));
        } catch (err) {
            console.error('Error accepting invitation:', err);
            setError('Failed to accept invitation. The link may be expired or invalid.');
        } finally {
            setIsAccepting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Subtle Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-900/20 to-transparent"></div>
            
            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                    <Card className="w-full max-w-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
                        <CardHeader className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="w-8 h-8 text-blue-400" />
                            </div>
                            
                            <CardTitle className="text-2xl font-bold text-white">
                                Project Invitation
                            </CardTitle>
                            
                            <CardDescription className="text-slate-300 text-lg">
                                You've been invited to collaborate on an exciting project!
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            {error ? (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                    <p className="text-red-400 text-sm text-center">{error}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Users className="w-5 h-5 text-blue-400" />
                                            <span>Join a collaborative workspace</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Calendar className="w-5 h-5 text-green-400" />
                                            <span>Manage tasks and deadlines together</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-purple-400" />
                                            <span>Track project progress in real-time</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 space-y-3">
                                        <Button 
                                            onClick={handleAcceptInvitation}
                                            disabled={isAccepting || !token}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-auto text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAccepting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Accepting Invitation...</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <UserPlus className="w-5 h-5" />
                                                    <span>Accept Invitation</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            )}
                            
                            {error && (
                                <Button 
                                    onClick={() => navigate('/projects')}
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                                >
                                    Go to Projects
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                    
                    <p className="text-slate-400 text-sm mt-6 text-center">
                        By accepting this invitation, you'll be added to the project team and can start collaborating immediately.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AcceptInvitation
