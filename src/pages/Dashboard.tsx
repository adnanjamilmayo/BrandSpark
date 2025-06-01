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
  Heart
} from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Supabase Test */}
        <div className="mb-8">
          <SupabaseTest />
        </div>

        {/* Welcome Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.firstName || 'Creator'}!</h1>
              <p className="text-gray-600">Your branding journey continues here</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <History className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Generations</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Saved Names</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Generations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Generations</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <History className="h-4 w-4" />
                  View All
                </button>
              </div>
              <RecentGenerations />
            </div>

            {/* Saved Names Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <SavedNames />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  <Sparkles className="h-4 w-4" />
                  Generate New Name
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Download className="h-4 w-4" />
                  Export All Names
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Share2 className="h-4 w-4" />
                  Share Collection
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(user?.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
                <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 