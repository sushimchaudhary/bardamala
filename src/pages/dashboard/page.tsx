import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Tag,
  Mail,
  Users,
  ArrowRight,
  Calendar,
  Eye,
} from "lucide-react";
import NepaliDate from "nepali-date-converter";
import api from "../../api/axiosInstance";
import { contentService } from "../../services/contentServices";
import { communicationService } from "../../services/communicationServices";
import { adService } from "../../services/adServices";

export default function DashboardPage() {
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [categoriesCount, setCategoriesCount] = useState<number | null>(null);
  const [messagesCount, setMessagesCount] = useState<number | null>(null);
  const [subscribersCount, setSubscribersCount] = useState<number | null>(null);
  const [adsCount, setAdsCount] = useState<number | null>(null);

  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeArray = (response: any) => {
    const data = response?.data?.data || response?.data || response;
    return Array.isArray(data) ? data : [];
  };

  const formatNepaliDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new NepaliDate(date).format("MMMM DD, YYYY", "np");
    } catch (e) {
      return dateString;
    }
  };

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        contentService.getPosts(),
        contentService.getCategories(),
        communicationService.getMessages(),
        adService.getAds(),
        api.get("/api/communication/subscribers/"),
      ]);

      const [postsRes, categoriesRes, messagesRes, adsRes, subsRes] =
        results.map((r, i) => {
          if (r.status === "fulfilled") return r.value;
          console.error(`Dashboard fetch failed for index ${i}:`, r.reason);
          return null;
        });

      const posts = normalizeArray(postsRes);
      const categories = normalizeArray(categoriesRes);
      const messages = normalizeArray(messagesRes);
      const ads = normalizeArray(adsRes);
      const subs = normalizeArray(subsRes);

      setPostsCount(posts.length ?? 0);
      setCategoriesCount(categories.length ?? 0);
      setMessagesCount(messages.length ?? 0);
      setAdsCount(ads.length ?? 0);
      setSubscribersCount(subs.length ?? 0);

      const sorted = [...posts].sort((a: any, b: any) => {
        const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });
      setLatestPosts(sorted.slice(0, 5));
    } catch (err) {
      console.error("Unexpected error fetching dashboard data:", err);
      setPostsCount(0);
      setCategoriesCount(0);
      setMessagesCount(0);
      setAdsCount(0);
      setSubscribersCount(0);
      setLatestPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="bg-gray-50/50 min-h-[80vh] font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#213a59]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quick overview and recent activity
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="/"
            className="text-xs text-[#2db7d1] hover:underline font-medium"
          >
            Visit Site
          </Link>
          <Link
            to="/dashboard/blog"
            className="bg-[#213a59] text-white px-3 py-1.5 rounded text-sm hover:bg-[#1a2e47] transition-colors"
          >
            Create Post
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link to="/dashboard/blog" className="group">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition border-l-4 border-l-[#213a59]">
            <div className="bg-[#213a59] text-white rounded-full p-3 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Posts</div>
              <div className="text-2xl font-bold text-gray-800">
                {loading ? "—" : (postsCount ?? 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Content & drafts</div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/category" className="group">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition border-l-4 border-l-[#2db7d1]">
            <div className="bg-[#2db7d1] text-white rounded-full p-3 flex items-center justify-center">
              <Tag size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Categories</div>
              <div className="text-2xl font-bold text-gray-800">
                {loading ? "—" : (categoriesCount ?? 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Organize content</div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/contact" className="group">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition border-l-4 border-l-[#213a59]">
            <div className="bg-[#213a59] text-white rounded-full p-3 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Messages</div>
              <div className="text-2xl font-bold text-gray-800">
                {loading ? "—" : (messagesCount ?? 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">New inquiries</div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/subscribe" className="group">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition border-l-4 border-l-[#2db7d1]">
            <div className="bg-[#2db7d1] text-white rounded-full p-3 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Subscribers</div>
              <div className="text-2xl font-bold text-gray-800">
                {loading ? "—" : (subscribersCount ?? 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Email list</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Posts */}
        <div className="col-span-2 bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div>
              <h2 className="text-lg font-bold text-[#213a59]">Latest Posts</h2>
              <p className="text-xs text-gray-500 mt-1">
                Most recent 3 posts
              </p>{" "}
              
            </div>
            <Link
              to="/dashboard/blog"
              className="text-sm text-[#2db7d1] hover:underline font-bold flex items-center gap-1"
            >
              Manage <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y">
            {latestPosts.length === 0 && !loading && (
              <div className="p-6 text-center text-gray-500 italic">
                No recent posts found.
              </div>
            )}

            {latestPosts.slice(0, 3).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-50 transition"
              >
                <div className="w-16 h-12 bg-gray-100 overflow-hidden rounded">
                  <Link to={`/blog/${p.slug}`}>
                    <img
                      src={p.photo || p.image || "/placeholder.jpg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                <div className="flex-1">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="font-semibold text-gray-800 hover:text-[#2db7d1] transition-colors"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#2db7d1]" />
                      {formatNepaliDate(p.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} className="text-[#2db7d1]" />
                      {p.view_count ?? 0}
                    </span>
                    <span className="text-[10px] bg-gray-100 text-[#213a59] px-2 py-0.5 rounded font-medium">
                      {p.category_name || p.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="text-xs text-[#2db7d1] font-bold hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Quick Actions & Ads */}
        <div className="col-span-1 space-y-3">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-2">
            <h3 className="text-sm font-bold text-[#213a59] mb-3 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard/blog"
                className="text-center text-sm bg-[#213a59] text-white px-3 py-1.5 rounded font-bold hover:bg-[#1a2e47] transition-all"
              >
                New Post
              </Link>
              <Link
                to="/dashboard/category"
                className="text-center text-sm bg-[#2db7d1] text-white px-3 py-1.5 rounded font-bold hover:bg-[#24a1b9] transition-all"
              >
                New Category
              </Link>
              <Link
                to="/"
                className="text-center text-sm border border-gray-200 text-[#213a59] px-3 py-1.5 rounded font-bold hover:bg-gray-50 transition-all"
              >
                Visit Site
              </Link>
            </div>
          </div>

          <div className="bg-white rounded border border-gray-100 shadow-sm p-2">
            <h3 className="text-sm font-bold text-[#213a59] mb-1 uppercase tracking-wider">
              Ads Status
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Active Ads</span>
              <span className="text-lg font-bold text-[#2db7d1]">
                {loading ? "—" : (adsCount ?? 0)}
              </span>
            </div>
            <Link
              to="/dashboard/ads"
              className="block text-center text-xs text-[#2db7d1] font-bold border border-[#2db7d1]/30 py-1.5 rounded hover:bg-[#2db7d1]/5"
            >
              Manage Advertising
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
