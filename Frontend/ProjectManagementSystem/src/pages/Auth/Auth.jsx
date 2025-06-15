import { useState } from "react"
import Signup from "./Signup"
import Login from "./Login"
import { Button } from "../../components/ui/button"

function Auth() {
    const [active, setActive] = useState(true)
    
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>
            
            {/* Blue accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Project Management
                        </h1>
                        <p className="text-slate-400">
                            {active ? "Create your account to get started" : "Welcome back! Please sign in"}
                        </p>
                    </div>

                    {/* Auth Card */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
                        {/* Form Content */}
                        <div className="space-y-6">
                            {active ? <Signup /> : <Login />}
                            
                            {/* Toggle Auth Mode */}
                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-slate-400 text-sm mb-3">
                                    {active ? "Already have an account?" : "Don't have an account?"}
                                </p>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setActive(!active)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 font-medium"
                                >
                                    {active ? "Sign in instead" : "Create account"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-slate-500 text-sm">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                </div>
                </div>
            </div>
    </div>
  )
}

export default Auth
