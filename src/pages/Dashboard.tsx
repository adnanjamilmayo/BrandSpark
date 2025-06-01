import { useUser } from "@clerk/clerk-react";
import { RecentGenerations } from "@/components/RecentGenerations";
import { Header } from "@/components/Header";
import { SupabaseTest } from "@/components/SupabaseTest";
import { SavedNames } from "@/components/SavedNames";
import { 
  Sparkles, 
  History, 
  Settings, 
  Star, 
  Download,
  Share2,
  Heart,
  Zap,
  Target,
  Palette,
  Globe,
  BarChart3,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const stats = [
    { title: "Total Names", value: "128", icon: <Sparkles className="h-5 w-5" />, color: "from-blue-500 to-blue-600" },
    { title: "Saved Names", value: "24", icon: <Heart className="h-5 w-5" />, color: "from-pink-500 to-pink-600" },
    { title: "Domains Checked", value: "89", icon: <Globe className="h-5 w-5" />, color: "from-green-500 to-green-600" },
    { title: "Branding Kits", value: "45", icon: <Palette className="h-5 w-5" />, color: "from-purple-500 to-purple-600" }
  ];

  const recentActivity = [
    { action: "Generated new names", time: "2 hours ago", icon: <Sparkles className="h-4 w-4" /> },
    { action: "Saved a branding kit", time: "5 hours ago", icon: <Heart className="h-4 w-4" /> },
    { action: "Checked domain availability", time: "1 day ago", icon: <Globe className="h-4 w-4" /> }
  ];

  const handleGenerateNewName = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Supabase Test */}
        <div className="mb-8">
          <SupabaseTest />
        </div>

        {/* Welcome Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user?.firstName || 'Creator'}!
              </h1>
              <p className="text-gray-600 text-lg">Your branding journey continues here</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white border-none shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white border-none shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="p-6 bg-white border-none shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Button 
                  onClick={handleGenerateNewName}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate New Name
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Download className="h-5 w-5 mr-2" />
                  Export All Names
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Collection
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="mt-8">
          <Card className="p-6 bg-white border-none shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Generations</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All
              </Button>
            </div>
            <RecentGenerations />
          </Card>
        </div>

        {/* Saved Names */}
        <div className="mt-8">
          <Card className="p-6 bg-white border-none shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Saved Names</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All
              </Button>
            </div>
            <SavedNames />
          </Card>
        </div>
      </div>
    </div>
  );
} 