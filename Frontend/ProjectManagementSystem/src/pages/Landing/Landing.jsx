
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { CheckCircle, Users, BarChart3, MessageSquare, Shield, Zap, GraduationCap, Mail } from 'lucide-react';

const Landing = () => {
  const navigate= useNavigate();
  const features = [
    {
      title: 'Project Management',
      description: 'Organize and track your projects with powerful management tools and real-time collaboration.',
      icon: <BarChart3 className="w-8 h-8 text-blue-400" />
    },
    {
      title: 'Issue Tracking',
      description: 'Keep track of bugs, features, and tasks with our comprehensive issue management system.',
      icon: <CheckCircle className="w-8 h-8 text-green-400" />
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time messaging and collaboration features.',
      icon: <Users className="w-8 h-8 text-purple-400" />
    },
    {
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and real-time project updates.',
      icon: <Zap className="w-8 h-8 text-yellow-400" />
    },
    {
      title: 'Team Communication',
      description: 'Built-in chat and messaging system to keep your team connected and productive.',
      icon: <MessageSquare className="w-8 h-8 text-cyan-400" />
    },
    {
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security and reliable infrastructure.',
      icon: <Shield className="w-8 h-8 text-red-400" />
    }
  ];



  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">Project Management</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-slate-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => window.open('mailto:bhsmaran@gmail.com')}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={()=>navigate("/auth")}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Manage Projects 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Like Never Before</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Streamline your workflow, collaborate seamlessly, and deliver exceptional results with our powerful project management platform.
            </p>
            
          </div>
          
          {/* Hero Stats Section */}
          <div className="mt-16 relative">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
                    <div className="text-slate-300 text-sm">Projects Completed</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="text-4xl font-bold text-green-400 mb-2">50K+</div>
                    <div className="text-slate-300 text-sm">Tasks Managed</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
                    <div className="text-slate-300 text-sm">Active Teams</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="text-4xl font-bold text-orange-400 mb-2">99.9%</div>
                    <div className="text-slate-300 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to manage projects efficiently and collaborate effectively with your team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-slate-800/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Developer</h2>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    S
                  </div>
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">Smaran Bhattarai</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                      <span className="text-slate-300 text-lg">
                        Computer Science Major, Senior at Northern Kentucky University
                      </span>
                    </div>
                    
                    <p className="text-slate-300 text-lg leading-relaxed">
                      This project management system was built as a demonstration of modern web development 
                      technologies and best practices. Combining a robust Spring Boot backend with a 
                      responsive React frontend, it showcases full-stack development capabilities.
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-green-400" />
                      <span className="text-slate-300">
                        Need support or have questions? Reach out at{' '}
                        <button 
                          onClick={() => window.open('mailto:bhsmaran@gmail.com')}
                          className="text-blue-400 hover:text-blue-300 transition-colors underline"
                        >
                          bhsmaran@gmail.com
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Projects?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Project Management to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={()=>navigate("/auth")}>
              Join Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">Project Management</span>
            </div>
            
            <div className="flex items-center space-x-6 text-slate-300">
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => window.open('mailto:bhsmaran@gmail.com')}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Project Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 